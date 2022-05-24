# Bookmark Management

---

> 기존 메타모스트에서는 북마크에 분류 기능이 없습니다. 저희 플러그인을 사용한다면 직접 여러가지 카테고리를 만들어 중요한 메세지를 종류별로 분류할 수 있습니다.

Preview :

![image](https://user-images.githubusercontent.com/53935439/169431752-0aa0a5a1-7b29-4edf-8c3f-44ba2fd12006.png)

## 1. **플러그인을 배포할 환경 설정**

### 1-1. 플러그인 가용 설정

Mattermost 서버가 로컬에서 실행 중인 경우 [로컬 모드](https://docs.mattermost.com/manage/mmctl-command-line-tool.html#local-mode) 및 [플러그인 업로드](https://docs.mattermost.com/configure/configuration-settings.html#enable-plugin-uploads) 를 활성화 하여 플러그인 배포를 간소화할 수 있다. 다음과 같이 서버 구성을 편집한다.

-   `cd mattermost-server`
-   `code .`

mattermost-server에서 config 폴더의 config.json 파일 열어서 아래와 같이 수정

```json
{
    "ServiceSettings": {
        ..."EnableLocalMode": **true**,
        "LocalModeSocketLocation": "/var/tmp/mattermost_local.socket"
    },"PluginSettings": {
        ..."Enable": **true**,
        "EnableUploads": **true**
    },"SqlSettings": {
        ..."Trace": **true**,
    },

		...
}
```

이후 서버에 적용하기 위해 서버 재실행

-   `make stop-server`
-   `make run-server`

System Console에서 설정 확인

-   좌측 상단 Channels → System Console → Database → SQL Statement Logging: **true**

![image](https://user-images.githubusercontent.com/53935439/169431530-21c7c8d3-d45b-48e1-a2e4-2f07480ed746.png)
![image](https://user-images.githubusercontent.com/53935439/169431549-8c7e4bdd-d6c8-4d7b-8753-f9c5d323b920.png)
![image](https://user-images.githubusercontent.com/53935439/169431597-f965efd0-3c0f-4e17-861c-ab999f48edfb.png)

### 1-2. 배포

mattermost-starter-template 폴더에서 아래 명령어로 플러그인을 배포한다.

-   `make deploy`

서버 재시작

-   make stop-server
-   make run-server
