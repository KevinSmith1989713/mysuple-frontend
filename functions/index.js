/**
 * 슈플 메인
 *
 * Install modules:
 *  npm install mysql --save
 *  npm install async --save
 *  npm install uuidv4 --save
 *
 * @since   2019-10-19
 * @author  sangheon Kim
 */

const auth = require('./controllers/Auth');
const review = require('./controllers/Review');

const taste = require('./controllers/Taste');

const curating = require('./controllers/Curating');

const gameInfo = require('./controllers/GameInfo');
const inquiry = require('./controllers/Inquiry');

/* Auth */
exports.Join = auth.join; // 가입
exports.LocalLogin = auth.localLogin; // 로컬 로그인
exports.SocialLogin = auth.socialLogin; // 소셜 로그인
exports.MyPage = auth.myPage; // 마이 페이지용 (잘 안씀 삭제 예정)
exports.NicknameUpdate = auth.nicknameUpdate; // 닉네임 업데이트
exports.WithDrawal = auth.withdrawal; // 회원탈퇴
exports.SameEmailCheck = auth.sameEmailCheck; // 이메일 인증( 회원가입 1본쨔)
exports.FindEmail = auth.findEmail; // 이메일 찾기
exports.ResetPasswordMailSend = auth.resetPasswordMailSend; //비밀번호 찾기

/* Review */
exports.CreateReview = review.createReview; // 리뷰 작성
/* Taste */
exports.CreateTaste = taste.createTaste; // 취향 생성
exports.JoinTaste = taste.joinTaste; // 회원가입시 테이스트 정보에 넣기
exports.ShowTaste = taste.showTaste; // 회원가입시 취향 선택 리스트 출력
exports.MyTaste = taste.myTaste; // 내 취향 보기
/* curating */
exports.MakeCurating = curating.makeCurating; // 큐레이팅 생성
exports.InsertCuratingGame = curating.InsertCuratingGame; // 큐레이팅에 게임 넣기

/* Inquiry */
exports.InsertInquiry = inquiry.insertInquiry;
