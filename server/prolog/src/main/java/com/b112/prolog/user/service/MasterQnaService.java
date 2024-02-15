package com.b112.prolog.user.service;

import com.b112.prolog.process.entity.Qna;
import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.exception.AccessDeniedException;
import com.b112.prolog.user.exception.DataNotFoundException;
import com.b112.prolog.user.repository.MasterQnaRepository;
import com.b112.prolog.user.repository.UserRepository;
import com.b112.prolog.user.util.AuthenticationUtils;
import com.mongodb.client.result.DeleteResult;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ExecutableUpdateOperation;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MasterQnaService {
    private final MasterQnaRepository masterQnaRepository;
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    // Create ✅
    public String createMasterQna(Qna masterQna) {
        Qna qna = mongoTemplate.save(masterQna, "qna");
        return qna.getId();
    }


    // Read ✅
    public List<Qna> findAll() {
        User user = mongoTemplate.findOne(new Query(
                Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId())
        ), User.class, "users");

        return Optional.ofNullable(user).orElseThrow(AccessDeniedException::new).getQnas();
    }


    // Update ✅
    public String updateMasterQna(Map<String, String> json) {
        if (hasMasterQna(json)) {
            ExecutableUpdateOperation.UpdateWithUpdate<Qna> updateTarget = mongoTemplate.update(Qna.class).matching(new Query(
                    Criteria.where("_id").is(json.get("id"))
            ));

            Update update = new Update();
            if (json.containsKey("question")) {
                update.set("question", json.get("question"));
            }
            if (json.containsKey("answer")) {
                update.set("answer", json.get("answer"));
            }
            updateTarget.apply(update).all();
        }
        return json.get("id");
    }


    // Delete ✅
    public void deleteMasterQnaById(String id) {
        if (hasMasterQna(id)) {
            DeleteResult deleteResult = mongoTemplate.remove(new Query(
                    Criteria.where("_id").is(id)
            ), "qna");
        }
    }

    public void deleteMasterQna(Qna masterQna) {
        deleteMasterQnaById(masterQna.getId());
    }

    public boolean hasMasterQna(Map<String, String> json) {
        return hasMasterQna(json.get("id"));
    }

    public boolean hasMasterQna(String id) {
        User user = mongoTemplate.findOne(new Query(
                Criteria.where("_id").is(AuthenticationUtils.getCurrentUserId())), User.class, "users");


        List<Qna> qnas = Optional.ofNullable(user).orElseThrow(AccessDeniedException::new).getQnas();

        boolean own = qnas.stream().anyMatch(qna -> Optional.ofNullable(qna.getId()).orElseThrow(DataNotFoundException::new).equals(id));

        if (!own) throw new AccessDeniedException();
        return true;
    }
}
