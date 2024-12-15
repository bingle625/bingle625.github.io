module Jekyll
    class ReplaceImagePaths < Generator
      safe true
  
      def generate(site)
        # 모든 포스트를 순회
        site.posts.docs.each do |post|
          # 포스트 콘텐츠 가져오기
          content = post.content
  
          # 이미지 경로 치환: ../images -> /images (또는 baseurl 포함)
          new_content = content.gsub(/!\[\]\(\.\.\/images\/(.+?)\)/) do |match|
            "![#{Regexp.last_match(1)}](#{site.baseurl}/images/#{Regexp.last_match(1)})"
          end
  
          # 수정된 콘텐츠를 다시 포스트에 저장
          post.content = new_content
        end
      end
    end
  end