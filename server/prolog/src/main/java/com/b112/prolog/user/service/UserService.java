package com.b112.prolog.user.service;

import com.b112.prolog.user.dto.Profile;
import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.exception.UserNotFoundException;
import com.b112.prolog.user.jwt.TokenProvider;
import com.b112.prolog.user.repository.TokenRepository;
import com.b112.prolog.user.repository.UserRepository;
import com.b112.prolog.user.util.AuthenticationUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ExecutableUpdateOperation;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final TokenProvider tokenProvider;

    private final MongoTemplate mongoTemplate;

    // Read
    /*
        TODO: DTO가 아닌 Map으로 응답하는 방법 알아보기
     */
    public Profile findUserById(String id) {
        User user = Optional.ofNullable(
                        mongoTemplate.findOne(new Query(
                                Criteria.where("_id").is(id)
                        ), User.class, "users"))
                .orElseThrow(UserNotFoundException::new);

        log.info("User Found: " + user.toString());

        return Profile.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .wishCompany(user.getWishCompany())
                .processes(user.getProcesses())
                .developer(user.isDeveloper())
                .newbie(user.isNewbie())
                .qnas(user.getQnas())
                .build();
//        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public Profile findCurrentUser() {
        return findUserById(AuthenticationUtils.getCurrentUserId());
    }

    // Create
    public void saveUser(User user) {
        userRepository.save(user);
    }

    // Update
    /*
        TODO: Update를 하는 방법 고민
        참고: https://docs.spring.io/spring-data/mongodb/reference/mongodb/mapping/document-references.html

        1. Process가 업데이트 되면 updateUser를 호출해야하나?
        2. Qna가 업데이트 되면?
           아래 updateUser 구현대로 한다면 모든 수정 요청이 이 메서드로 와야 한다.

        collection으로 분리된 document 업데이트(PUT) 는 collection에 요청하면 된다.
        생성, 삭제 요청은 root document(User)에 요청을 보내야 추가할 수 있다.

        프론트에서 변경 사항에 따라 다르게 요청을 보내자
        프로세스에서 전형의 순서만 변경되었다면? 바뀐 순서를 전부 보내

        3. 프론트에서 변경사항만 들어오면, 모든 필드에 null check를 해서 필드에 맞게 Update?
        그게 아니면 Map 형태로 받아서 map에 존재하는 key들만 overwrite
     */
    public void updateUserInfo(Map<String, Object> json) {

        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId()))
                );

        Optional.ofNullable(json.get("wishCompany")).ifPresent(o ->
                updateTarget.apply(new Update().push("wishCompany", o)).first());

    }

    public void updateUserProcess(String processId) {
        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId()))
                );

        updateTarget.apply(new Update().push("processes", processId)).first();

//        Query q = new Query(Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId()));
//        Update u = new Update();
//        u.push("processes", processId);
//        userRepository.upsertProcess(q, u, "users");
    }

    public void updateUserQna(String qnaId) {
        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId()))
                );


        updateTarget.apply(new Update().push("qnas", qnaId)).first();

//        Query q = new Query(Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId()));
//        Update u = new Update();
//        u.push("processes", processId);
//        userRepository.upsertProcess(q, u, "users");
    }

    // Delete
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public void deleteCurrentUser() {
        deleteUserById(AuthenticationUtils.getCurrentUserId());
    }

}
