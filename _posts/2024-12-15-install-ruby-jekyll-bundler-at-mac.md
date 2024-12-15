---
layout: post
title:  "맥 환경에서 ruby, jekyll, bundler 설치하기 (sudo 쓰면 안됨)"
date:   2024-12-15 16:16:14 +0900
categories: github blog
---
## 문제 상황

```
# You don't have write permissions for the /Library/Ruby/Gems/...
```

**맥**에서는 기본으로 시스템에서 의존하고 있는 ruby가 있다.
문제는 해당 루비의 버전이 낮은 편이기 때문에, 해당 환경에서 바로 bundler 나 jekyll을 설치하면 정상적으로 설치되지 않는다.

의존성 문제가 발생하기도 하고, 의존성에 맞게 bundler나 jekyll의 버전을 조정하여 설치하려고 하여도 ruby의 라이브러리를 저장하는 디렉토리에 쓰기 권한 문제가 발생한다.

해당 권한 문제를 해결하기 위해 섣불리 sudo 등의 명령어를 쓰게 되면, 시스템에서 사용하는 ruby에 어떤 문제가 발생할지 모르기 때문에, 우리는 다른 해결 방식을 채택해야 한다.

아래 스택오버 플로우 이슈의 경우가 나와 동일한 이슈였는데, comment에서 실제로 sudo로 그냥 권한 바꿔버리라는 무책임한 이야기를 하지만, 첫 답변에서 다른 해결책을 제시해준다.

[내 문제와 동일했던 이슈](https://stackoverflow.com/questions/51126403/you-dont-have-write-permissions-for-the-library-ruby-gems-2-3-0-directory-ma)

## 해결책
따라서, rbenv, rvm 과 같은 ruby 버전 매니저로 별도의 ruby 설치해준 후, cli 환경에서 해당 ruby를 사용하도록 하여, gem으로 bundler, jekyll 패키지를 설치해야한다.

###  1. rbenv 설치

나는 brew를 사용했고, 다른 것을 사용해도 상관은 없다.

``` 
$ brew install rbenv 

# cli 환경에서 rbenv init 되도록 수정
$ rbenv init
```

rbenv init 은 쉘(cli)를 초기화 할때마다 실행시켜 주어야 하는 것으로 보이므로, rc파일(.zshrc or .bashrc) 에 해당 스크립트를 넣어주도록 하자.

```
# 실행 시 zshrc, 혹은 bashrc에 rbenv를 cli 환경에 hook 해주는 스크립트가 맨 아래에 추가된다. (이미지 참고)
$ rbenv init
```

만약 위 스크립트로 제대로 실행이 되지 않았다면, zshrc or bashrc 를 직접 수정해서 이미지에 해당하는 스크립트를 추가하자.
```
# zsh 사용한다면, zshrc, 아니라면 bashrc 사용하는 terminal 환경에 맞게 수정
$ vi ~/.zshrc
```
![](../images/Pasted%20image%2020241215175655.png)
### 2. ruby 설치
이제 ruby 를 설치하자.
ruby는 stable 한 버전중에 가장 최신 버전을 설치해주면 된다.

![](../images/Pasted%20image%2020241215180049.png)

3.3.6이 가장 최신 버전으로 보였기 때문에, 해당 버전을 설치해줬다.

```
$ rbenv install 3.3.6

# 설치한 ruby의 버전을 cli 환경에서 기본으로 설정
$ rbenv global 3.3.6

# 버전 변경 되었는지 확인 후, 되지 않았다면 터미널 껐다 켜기
$ rbenv --version
```

### 3. bundler, jekyll 설치하기

이제, 제대로 설치가 될것이다.

```
$ rbenv install bundler

$ rbenv install jekyll
```

이후로는 bundler를 이용해서 테마를 수정하고, jekyll로 배포 하면서 블로그를 시작하면 된다.