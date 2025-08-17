#!/bin/bash

# 결과물을 저장할 webp 폴더 생성
mkdir -p webp

# 현재 폴더의 jpg, png, gif 파일을 하나씩 처리
for file in *.jpg *.png *.gif; do
  # 파일이 실제로 존재하는 경우에만 실행
  if [ -f "$file" ]; then
    # 파일명에서 확장자 제거 (예: 민경국.jpg -> 민경국)
    filename=$(basename "$file")
    filename_noext="${filename%.*}"

    echo "Converting: $file"

    # magick 명령어로 리사이즈 및 webp 변환 실행
    # -resize '256x' : 가로 너비를 256px로 맞추고, 세로는 원본 비율에 따라 자동 조절
    magick "$file" -resize '256x' "webp/${filename_noext}.webp"
  fi
done

echo "✅ All tasks completed."
