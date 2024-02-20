# 📝 우리들의 취업 프로세스 로그, Pro.log

![Pro.log.svg](/uploads/9efd85e5b06e2018e22419d0ed93cc3c/Pro.log.svg)

# 프로젝트 진행 기간

2024.01.08(월) ~ 2024.02.16(금) (6주)

SSAFY 10기 2학기 공통프로젝트 - Pro.log

## ✔️ 팀원 소개

![스크린샷_465_](/uploads/6964f0bd1916058a81843cec45c91c62/스크린샷_465_.png)

## ✔️ 한 줄 소개

우리들의 취업 프로세스 로그 **Pro.log** ( Process + Log )

**채용공고,** 채용 전형 별 기록 **템플릿**을 제공해줌으로서 **한 번에** 사용자의 **취업준비를 관리**

## ✔️ 기획 배경

**채용공고**를 확인하기위해 자소설닷컴, 사람인에 들어가고, 기업별로 자기소개서, 면접등 전형을 **기록**하기 위해 노션 / 엑셀 사용까지 ! 🙆‍♂️

한 기업만 지원해도 사용해야하는 플랫폼은 **2개 이상**인데다가, 어떤식으로 기록해야 좋을 지 고민하는 취업준비생을 위해

⇒ 취업 준비를 **한 개**의 플랫폼에서 할 수 있는 **All in one** 사이트를 만들고자 했습니다

- 취업을 위해 입사 지원을 하는 과정에서, 서류, 코딩 테스트, 1, 2차 면접 등 각 채용 프로세스 별로 지원 일정을 관리해야 할 필요성을 느꼈습니다.
- 노션을 활용해 개인적으로 템플릿을 만들고 입사 지원 일정을 관리하고자 했습니다. 하지만 수동으로 작성해야 하는 부분들이 많아 불편함을 경험했습니다.
- 템플릿을 만드는 데 시간이 많이 들어, 취업 준비보다 노션 작성에 빼앗기는 시간이 더 많아지다 보니 작성하다 포기하는 상황이 발생하기도 하였습니다.
- 노션 템플릿의 기능을 웹 페이지로 구현하고 일부 기능을 자동화하면 기존에 느꼈던 불편함을 해소 할 수 있을 것이라는 생각이 들어, 프로젝트를 진행하게 되었습니다.

## ✔️ 타겟

- 다양한 취업준비 플랫폼에 번거로움을 느끼는 취업준비생
- 노션, 한글에 취업준비 과정을 어떤식으로 기록을 해야할지 모르겠는 취업준비생

## ✔️ 주요기능

### 1. 일정 관리 (캘린더뷰 / 칸반뷰)

- 캘린더로 채용공고 확인 가능
  - JD
  - 내 일정으로 추가
- 캘린더로 나의 일정 확인 가능
- 칸반으로 나의 일정 확인 가능
  - 채용 유형(서류, 테스트, 면접, 최종)별 구분

### 2. 프로세스 관리

- Paper(서류), Test(코딩테스트, 인적성), Interview (면접) 세가지 전형으로 프로세스를 관리

### 3. 다양한 템플릿 제공

- 자기소개서 / 코딩테스트 / 토글 / 빈페이지

  4가지 템플릿 제공

### 3. 전형별 통계 제공

- 전체 지원 기업 중 합격한 비율
- 내가 진행하고 있는 프로세스의 서류 / 테스트 / 면접 비율

### 4. 마스터 자기소개서 관리

- 일정에 등록되지 않은 마스터 자기소개서 작성, 관리

### 5. 화상 채팅 기능

- WebRTC기술을 활용한 화상채팅 기능 구현

## ✔️ 기대 효과

- 공고확인, 프로세스 관리 통합 서비스로 기존 다수 플랫폼 사용의 번거로움 해결
- 템플릿 제공으로 사용의 편리함
- 전형별 통계를 통한 진행도 파악 가능
- 전 직군으로의 확장성

## ✔️ 프로젝트 사용 도구

- 이슈 관리: Jira
- 형상 관리: Gitlab
- 커뮤니케이션: Notion, Mattermost
- 디자인: Figma
- UCC: Movavi video editor plus 2022
- CI/CD: Jenkins
- ERD: ERD Cloud
- Architecture diagram: Cloudcraft

## ✔️ 개발 도구

- Visual Studio Code: 1.85.1
- Intellij Ultimate: 2023.3.2
- WSL2
- Ubuntu 22.0.4
- Jira Webhook
- Terminus
- MySQL workbench
- MongoDB compass

## ✔️ 개발 환경

### Frontend

| 이름    | 버전                         |
| ------- | ---------------------------- |
| Node.js | 21.6.1 (includes npm 10.2.4) |
| React   | 18.2.0                       |

### Backend

| 이름            | 버전                           |
| --------------- | ------------------------------ |
| Java            | openJDK 17.0.9" 2023-10-17 LTS |
| SpringBoot      | 3.2.2                          |
| JPA + Hibernate |                                |
| Gradle          | 8.5                            |

### DB

| 이름    | 버전   |
| ------- | ------ |
| MySQL   | 8.0.35 |
| MongoDB | 7.0.5  |
| Redis   | 7.2.4  |

### Service

| 이름           | 버전                     |
| -------------- | ------------------------ |
| docker         | 25.0.1                   |
| docker-compose | 2.24.5                   |
| NginX          | Openvidu 내장 nginx 사용 |
| Jenkins        | 2.426.3                  |
| Openvidu       | 2.29.0                   |

더 자세한 정보는 포팅 매뉴얼 참고

## ✔️ 시스템 구조도

![prolog_architecture](/uploads/4a8168b082a54f978bfe2d4a264d1cb0/prolog_architecture.png)

## ✔️ ERD

![ProLog__4_](/uploads/06ddd26f07ec4430138fe6c992f009c1/ProLog__4_.png)

## ✔️ 프로젝트 파일 구조

```
prolog-back
  ├── jobdescription
  │   ├── cache
  │   ├── controller
  │   ├── dto
  │   ├── entity
  │   ├── repository
  │   └── service
  ├── process
  │   ├── controller
  │   ├── dto
  │   ├── entity
  │   ├── repository
  │   └── service
  └── user
        ├── config
        ├── controller
        ├── dto
        ├── entity
        ├── exception
        ├── handler
        ├── info
        ├── jwt
        ├── repository
        ├── service
        └── util

```

```
prolog-front
  ├── node_modules
  ├── public
  └── src
      ├── api
      ├── assets
      ├── common
      │   ├── components
      │   └── hooks
      ├── components
      │   ├── dashboard
      │   ├── jobdescription
      │   ├── login
      │   ├── main
      │   ├── masterPaper
      │   ├── myInfo
      │   ├── process
      │   ├── sidebar
      │   ├── store
      │   ├── templates
      │   │   ├── assay
      │   │   ├── ct
      │   │   ├── interview
      │   │   └── memo
      │   └── webrtc
      ├── cookie
      ├── pages
      └── state

```

## ✔️ 프로젝트 산출물

- <a href ="#"> 기획서 </a>
- <a href ="#"> MVP Targeting </a>
- <a href ="#"> 요구사항 정의서 </a>
- <a href ="#"> 화면 설계 </a>
- <a href ="#"> API 명세서 </a>

## ✔️ 프로젝트 결과물

- <a href ="#"> 포팅매뉴얼 </a>
- <a href ="#"> 중간발표자료 </a>
- <a href ="#"> 최종발표자료 </a>

## ✔️ Pro.log 서비스 화면

작성좀
