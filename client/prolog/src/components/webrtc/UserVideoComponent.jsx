import OpenViduVideoComponent from './OvVideo';
import React from 'react';

const UserVideoComponent = ({ streamManager }) => {
    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData;
    };

    return (
        <div>
            {streamManager !== undefined ? (
                <div className="streamcomponent">
                    <OpenViduVideoComponent streamManager={streamManager} />
                    <div id="test">
                        <p>{getNicknameTag()}</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default UserVideoComponent;
