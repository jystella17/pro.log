package com.b112.prolog.user.service;

import com.b112.prolog.user.dto.Profile;
import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.entity.UserPrincipal;
import com.b112.prolog.user.exception.NotAuthenticatedException;
import com.b112.prolog.user.repository.TokenRepository;
import com.b112.prolog.user.repository.UserRepository;
import com.b112.prolog.user.exception.UserNotFoundException;
import com.mongodb.client.result.DeleteResult;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ExecutableUpdateOperation;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final UserPrincipalService userPrincipalService;
    private final MongoTemplate mongoTemplate;

    public UserService(UserRepository userRepository, TokenRepository tokenRepository,
                       UserPrincipalService userPrincipalService, MongoTemplate mongoTemplate) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.userPrincipalService = userPrincipalService;
        this.mongoTemplate = mongoTemplate;
    }

    // Read
    @Transactional
    public Profile findUserById(String uuid) {
        User user = Optional.ofNullable(
                        mongoTemplate.findOne(new Query(
                                Criteria.where("_id").is(uuid)
                        ), User.class, "users"))
                .orElseThrow(UserNotFoundException::new); // Exception 수정 필요

        return Profile.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .wishCompany(user.getWishCompany())
                .processes(user.getProcesses())
                .isDeveloper(user.isDeveloper())
                .careerType(user.getCareerType().getDisplayName())
                .qnaList(user.getQnaList())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public Profile findCurrentUserByEmail(String email) {
        User user = Optional.ofNullable(
                mongoTemplate.findOne(new Query(Criteria.where("email").is(email)), User.class))
                .orElseThrow(UserNotFoundException::new);

        return Profile.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .wishCompany(user.getWishCompany())
                .processes(user.getProcesses())
                .isDeveloper(user.isDeveloper())
                .careerType(user.getCareerType().getDisplayName())
                .qnaList(user.getQnaList())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public Profile findCurrentUser() {
        UserPrincipal userPrincipal = userPrincipalService.loadCurrentUser();

        return findUserById(userPrincipal.getUuid());
    }

    // Create
    @Transactional
    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void register() {
        //
    }

    public void saveUserIfNotExists(User userInfo) {
        Optional<User> existUser = userRepository.findUserByEmail(userInfo.getEmail());

        if (existUser.isEmpty()) {
            User user = User.builder()
                    .uuid(String.valueOf(UUID.randomUUID()))
                    .password(userInfo.getPassword())
                    .email(userInfo.getEmail())
                    .nickname(userInfo.getNickname())
                    .role(userInfo.getRoleType().getCode())
                    .wishCompany(new ArrayList<>())
                    .isDeveloper(userInfo.isDeveloper())
                    .careerType(userInfo.getCareerType())
                    .phoneNumber(userInfo.getPhoneNumber())
                    .build();

            saveUser(user);
        }
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
//    public void updateUserInfo(Map<String, Object> json) {
//        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
//                .matching(new Query(
//                        Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId())));
//
//        json.forEach((key, value) -> updateTarget.apply(new Update().set(key, value)).all());
//    }

    public void updateUserInfo(Profile profile) {
        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is("AuthenticationUtils.getCurrentUserId()")));

        Update update = new Update();
        Optional.ofNullable(profile.getEmail()).ifPresent(value ->
                update.set("email", value));
        Optional.ofNullable(profile.getNickname()).ifPresent(value ->
                update.set("nickname", value));
        Optional.ofNullable(profile.getWishCompany()).ifPresent(value ->
                update.set("wishCompany", value));
        Optional.of(profile.isDeveloper()).ifPresent(value ->
                update.set("developer", value));
        Optional.of(profile.getCareerType()).ifPresent(value ->
                update.set("careerType", value));
        Optional.ofNullable(profile.getPhoneNumber()).ifPresent(value ->
                update.set("phoneNumber", value));

        updateTarget.apply(update).all();
    }


    public void updateUserProcess(String id) {
        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is("AuthenticationUtils.getCurrentUserId()")));
        updateTarget.apply(new Update().push("processes", id)).first();
    }

    public void updateUserQna(String qnaId) {
        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is("AuthenticationUtils.getCurrentUserId()")));
        updateTarget.apply(new Update().push("qnas", qnaId)).first();
    }

    public void deleteUserById(String id) {
        DeleteResult deleteResult = mongoTemplate.remove(new Query(
                Criteria.where("_id").is(id)
        ), "users");
    }

    public void deleteCurrentUser() {
        deleteUserById("AuthenticationUtils.getCurrentUserId()");
    }

    public void deleteUserQna(String id) {
        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is("AuthenticationUtils.getCurrentUserId()")));
        updateTarget.apply(new Update().pull("qnas", id)).all();
    }

    public void deleteUserProcess(String id) {
        ExecutableUpdateOperation.UpdateWithUpdate<User> updateTarget = mongoTemplate.update(User.class)
                .matching(new Query(
                        Criteria.where("_id").is("AuthenticationUtils.getCurrentUserId()")));
        updateTarget.apply(new Update().pull("process", id)).all();
    }

}
