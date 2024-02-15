import { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from '../components/webrtc/UserVideoComponent'
import './WebRtc.css'

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i10b112.p.ssafy.io/webrtc/' : 'https://i10b112.p.ssafy.io/webrtc/';

const WebRtc = () => {
    const [mySessionId, setMySessionId] = useState('Prolog'+Math.floor(Math.random() * 1000));
    const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 1000));
    const [session, setSession] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
        };
    }, []);

    const onBeforeUnload = (event) => {
        leaveSession();
    };

    const handleChangeSessionId = (e) => {
        setMySessionId(e.target.value);
    };

    const handleChangeUserName = (e) => {
        setMyUserName(e.target.value);
    };

    const handleMainVideoStream = (stream) => {
        if (mainStreamManager !== stream) {
            setMainStreamManager(stream);
        }
    };

    const deleteSubscriber = (streamManager) => {
        setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
    };

    const joinSession = async () => {
        const OV = new OpenVidu();
        const newSession = OV.initSession();

        setSession(newSession);

        newSession.on('streamCreated', (event) => {
            const subscriber = newSession.subscribe(event.stream, undefined);
            setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
        });

        newSession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager);
        });

        newSession.on('exception', (exception) => {
            console.warn(exception);
        });

        try {
            const token = await getToken();
            await newSession.connect(token, { clientData: myUserName });

            const publisher = await OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
                mirror: false,
            });

            await newSession.publish(publisher);

            setPublisher(publisher);
        } catch (error) {
            console.log('There was an error connecting to the session:', error.code, error.message);
        }
    };

    const leaveSession = () => {
        if (session) {
            session.disconnect();
        }

        setSession(undefined);
        setSubscribers([]);
        setMySessionId('Prolog'+Math.floor(Math.random() * 1000));
        setMyUserName('Participant' + Math.floor(Math.random() * 1000));
        setMainStreamManager(undefined);
        setPublisher(undefined);
    };

    const changeCameraStatus = async () => {
        if (publisher) {
            let videoTrack = publisher.stream.mediaStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
            }
        }
    };

    const changeMicStatus = async () => {
        if (publisher) {
            let audioTrack = publisher.stream.mediaStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
            }
        }
    };

    

    const getToken = async () => {
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    };

    const createSession = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'webrtc/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data; // The sessionId
    };

    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'webrtc/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data; // The token
    };

    return (
        <div className="container">
            {session === undefined ? (
                <div id="join">
                    <div id="join-dialog" className="jumbotron vertical-center">
                        <h1 className="makeChat"> 화상채팅을 만들어보세요 </h1>
                        <form className="form-group" onSubmit={joinSession}>
                            <p>
                                <label>참여자 이름: </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="userName"
                                    value={myUserName}
                                    onChange={handleChangeUserName}
                                    required
                                />
                            </p>
                            <p>
                                <label> 세션명: </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="sessionId"
                                    value={mySessionId}
                                    onChange={handleChangeSessionId}
                                    required
                                />
                            </p>
                            <p className="text-center">
                                <input className="btn join-btn" name="commit" type="submit" value="JOIN" />
                            </p>
                        </form>
                    </div>
                </div>
            ) : null}

            {session !== undefined ? (
                <div id="session">
                    <div id="session-header">
                        <h1 id="session-title">{mySessionId}</h1>
                        <div id="btn-group">

                            <div className="btn-left">
                                <input
                                className="btn"
                                type="button"
                                id="buttonToggleCamera"
                                onClick={changeCameraStatus}
                                value="카메라 토글"
                                />
                                <input
                                className="btn btn-left"
                                type="button"
                                id="buttonToggleMic"
                                onClick={changeMicStatus}
                                value="마이크 토글"
                                />   
                            </div>
                            
                            <div className="btn-right">
                                
                                <input
                                className="btn"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={leaveSession}
                                value="세션 나가기"
                                />
                            </div>
                            
                        
                        
                        
                        </div>
                        
                        
                    </div>

                    <div id="video-container" className="col-md-10">
                        {publisher !== undefined ? (
                            <div className="stream-container col-md-6" onClick={() => handleMainVideoStream(publisher)}>
                                <UserVideoComponent streamManager={publisher} />
                            </div>
                        ) : null}

                        {subscribers.map((sub, i) => (
                            <div key={i} className="stream-container col-md-6" onClick={() => handleMainVideoStream(sub)}>
                                <UserVideoComponent streamManager={sub} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default WebRtc;
