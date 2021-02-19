-- 이메일 찾기
SELECT email,name FROM user WHERE phone= "010-2284-8367" AND name="김상헌";


-- 취향 나오기
SELECT game_id, game_title, game_image_src FROM game_info WHERE game_image_src IS NOT NULL ORDER BY rand() LIMIT 30;

-- 게임 나오기
SELECT * FROM taste_info WHERE email="403-forbidden@kakao.com";

-- 문의 사항 확인 후 조회
SELECT email, q_id FROM qa  WHERE email="ksj8367@gmail.com";
-- 문의 사항 디테일 조회
SELECT * FROM qa WHERE email="ksj8367@gmail.com" AND q_id=2;
-- 취향 업데이트 후 둘다 0,0인것 목록에서 제거
DELETE FROM taste_info WHERE taste_like="0" AND price_alarm="0";