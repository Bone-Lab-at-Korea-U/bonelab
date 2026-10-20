# Bone Lab at Korea University

Homepage of the Bone Lab at Korea University (https://bone.korea.ac.kr), served by GitHub Pages.

## 연구원 목록 수정 (Pages CMS)

1. https://app.pagescms.org 에 GitHub 계정으로 로그인
2. 이 저장소 선택 후 왼쪽 메뉴의 **연구원 목록 (Team)** 클릭
3. 이름, 직함, 사진을 수정하거나 **Add an entry** 로 새 연구원 추가, 끌어서 순서 변경
4. **Save** 를 누르면 1 to 2분 안에 홈페이지에 반영됩니다

사진은 정사각형(420 x 420 px 이상)으로 올리면 원래 사이트와 똑같이 보입니다.

## 구조

- `index.html` : 페이지 본문 (About, Research, Publications, Translation, Contact)
- `data/team.json` : 연구원 목록 (CMS가 편집하는 파일)
- `assets/img/` : 원래 Wix 사이트의 원본 이미지
- `assets/img/team/original/` : 연구원 일러스트 원본 (자르기 전)
- `.pages.yml` : Pages CMS 설정
