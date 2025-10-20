package com.b112.prolog.user.service;

import com.b112.prolog.user.dto.RegisterDto;
import com.b112.prolog.user.entity.CareerType;
import com.b112.prolog.user.entity.RoleType;
import com.b112.prolog.user.entity.User;
import com.b112.prolog.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Component
public class UserDataGenerator implements CommandLineRunner {

    private final UserRepository userRepository;

    public UserDataGenerator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private static final List<String> COMPANIES = Arrays.asList(
            "Naver", "Kakao", "Line", "Google", "Microsoft", "Meta",
            "Apple", "Nvidia", "Netflix", "AWS"
    );
    private static final List<String> CAREER_TYPES = Arrays.asList(
            "GRADUATE", "JUNIOR", "SENIOR", "STAFF", "HEAD"
    );
    private static final List<String> DOMAINS = Arrays.asList(
            "@gmail.com", "@naver.com"
    );

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 10) {
            log.info("User data already exists. Skipping generation.");
            return;
        }

        int count = 100; // 생성할 사용자 수
        List<User> userList = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            RegisterDto dto = generateRegisterDto(i);
            User user = convertToEntity(dto);
            userList.add(user);
        }

        userRepository.saveAll(userList);
        log.info("✅ {}개의 더미 사용자 데이터를 MongoDB에 저장 완료!", count);
    }

    private RegisterDto generateRegisterDto(int index) {
        Random random = new Random();

        String emailPrefix = randomAlphaNumeric(8);
        String email = emailPrefix + DOMAINS.get(random.nextInt(DOMAINS.size()));
        String password = randomAlphaNumeric(10);
        String nickname = "user" + index;

        List<String> wishCompany = new ArrayList<>();
        int wishCount = random.nextInt(4); // 0~3개
        Collections.shuffle(COMPANIES);
        for (int i = 0; i < wishCount; i++) {
            wishCompany.add(COMPANIES.get(i));
        }

        boolean isDeveloper = random.nextBoolean();
        String careerType = CAREER_TYPES.get(random.nextInt(CAREER_TYPES.size()));

        String phoneNumber = String.format("010-%04d-%04d",
                random.nextInt(10000),
                random.nextInt(10000));

        return RegisterDto.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .wishCompany(wishCompany)
                .isDeveloper(isDeveloper)
                .careerType(careerType)
                .phoneNumber(phoneNumber)
                .build();
    }

    private String randomAlphaNumeric(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    private User convertToEntity(RegisterDto dto) {
        return User.builder()
                .uuid(UUID.randomUUID().toString())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .nickname(dto.getNickname())
                .roleType(RoleType.USER)
                .wishCompany(dto.getWishCompany())
                .processes(new ArrayList<>())
                .isDeveloper(dto.isDeveloper())
                .careerType(CareerType.valueOf(dto.getCareerType()))
                .qnaList(new ArrayList<>())
                .phoneNumber(dto.getPhoneNumber())
                .lastJwtIssuedAt(LocalDateTime.now())
                .build();
    }
}
