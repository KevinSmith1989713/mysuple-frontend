import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { path } from '../../../assets/dummyData/AuthData';
import { url } from '../../../constants/apiUrl.js';
import Select from 'react-select';
import { bankData } from '../../../assets/dummyData/AuthData';

import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';
import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import checkMarkBlue from '../../../static/images/checkmarkBlue.svg';
import './CertificationModal.scss';

const CertificationModal = ({
	openModal,
	setOpenModal,
	setApplyState,
	flag,
	setFlag,
}) => {
	let history = useHistory();
	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	const [file, setFile] = useState(null);
	const [id, setId] = useState(null);

	const [acount, setAcount] = useState('');
	const [name, setName] = useState('');
	const [bank, setBank] = useState('');

	const [imgFile, setImgFile] = useState('');
	const [fileUrl, setFileUrl] = useState('');
	const [imgId, setImgId] = useState('');

	//통장사본
	const onChangeFile = async e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];
		try {
			const options = {
				maxSizeMB: 5,
				maxWidthOrHeight: 1500,
			};
			const compressedFile = await imageCompression(file1, options);
			const file = new File([compressedFile], file1.name);
			setFile(file);
			reader.onloadend = () => {
				setFile(file);
			};
			reader.readAsDataURL(file);
		} catch (error) {
			console.log(error);
		}
	};

	//신분증
	const onChangeId = async e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];

		try {
			const options = {
				maxSizeMB: 5,
				maxWidthOrHeight: 1500,
			};
			const compressedFile = await imageCompression(file1, options);
			const file = new File([compressedFile], file1.name);
			setId(file);
			reader.onloadend = () => {
				setId(file);
			};
			reader.readAsDataURL(file);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		try {
			const options = {
				headers: {
					'content-type': 'multipart/form-data',
					bucket_name: 'pass_auth_suple',
				},
			};
			const formData = new FormData();
			formData.append('image', file);
			axios.post(`${url.file}/LeagueImage`, formData, options).then(res => {
				console.log(res.data.link);
				setImgFile(res.data.link);
			});
		} catch (e) {
			console.error(e);
		}
	}, [file]);

	useEffect(() => {
		try {
			const options = {
				headers: {
					'content-type': 'multipart/form-data',
					bucket_name: 'pass_auth_suple',
				},
			};
			const formData = new FormData();
			formData.append('image', id);
			
			axios.post(`${url.file}/LeagueImage`, formData, options).then(res => {
				setImgId(res.data.link);
			});
		} catch (e) {
			console.error(e);
		}
	}, [id]);

	const request = () => {
		if (imgFile === undefined) {
			alert('통장사본을 등록해주세요.');
		} else if (bank === '') {
			alert('은행을 선택해주세요.');
		} else if (acount === '') {
			alert('계좌번호을 등록해주세요.');
		} else if (name === '') {
			alert('이름을 등록해주세요.');
		} else if (imgId === undefined) {
			alert('신분증을 등록해주세요.');
		} else {
			try {
				const options = {
					headers: {
						'content-type': 'multipart/form-data',
						bucket_name: 'pass_auth_suple',
					},
				};
				const formData = new FormData();
				formData.append('real_name', name);
				formData.append('id', getUserInfo.id);
				formData.append('bank', bank);
				formData.append('account_num', acount);
				formData.append('id_card_copy', imgId);
				formData.append('bankbook_copy', imgFile);

				axios
					.post(`${url.file}/PassAuthInsert`, formData, options)
					.then(res => {
						if (res.status === 200) {
							setOpenModal(!openModal);
							setApplyState(true);
							setTimeout(() => {
								setApplyState(false);
							}, 1000);

							setFlag(!flag);
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	};
	return (
		<div className="CertificationModal">
			<img src={fileUrl} />
			<div
				className="background"
				onClick={() => {
					setOpenModal(!openModal);
				}}
			/>
			<article className="modal--box">
				<div className="modal__title">
					<h1>환전 본인인증</h1>
					<button>
						<img
							className="closeBtn"
							src={closeBtnGray}
							onClick={() => {
								setOpenModal(!openModal);
							}}
						/>
					</button>
				</div>
				{/******************* 통장사본 *******************/}
				<div className="modalInner--box">
					<div className="info--box">
						<span>통장사본</span>
						<div>
							<div className="input--box">
								<input
									className="img__input"
									value={file ? file.name : '이미지'}
								/>
								<div className="upload--btn">
									<label htmlFor="uploadBtn" className="btn_file">
										찾아보기
									</label>
									<input
										id="uploadBtn"
										type="file"
										className="file-class"
										accept="image/gif,image/jpeg,image/png"
										onChange={e => onChangeFile(e)}
									/>
								</div>
							</div>
						</div>
					</div>

					{/******************* 계좌 *******************/}
					<div className="info--box acount">
						<span className="acount__text">계좌</span>
						<div>
							<div className="input--box acount__input">
								<Select
									className="select-form"
									defaultValue={{ label: '은행' }}
									onChange={e => setBank(e.label)}
									options={bankData}
								/>
								<input
									placeholder="계좌번호"
									className="__input"
									type="number"
									value={acount}
									onChange={e => setAcount(e.target.value)}
								/>
							</div>
							<input
								placeholder="이름"
								className="__input name"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
					</div>
					{/******************* 신분증 *******************/}
					<div className="info--box id">
						<span>신분증</span>
						<div>
							<div className="input--box">
								<input className="img__input" value={id ? id.name : '이미지'} />
								<div className="upload--btn">
									<label htmlFor="uploadBtn__id" className="btn_file">
										찾아보기
									</label>
									<input
										id="uploadBtn__id"
										type="file"
										className="file-class"
										accept="image/gif,image/jpeg,image/png"
										onChange={e => onChangeId(e)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button
					className={
						imgId === undefined || imgFile === undefined
							? 'certificationBtn bgGray'
							: 'certificationBtn'
					}
					onClick={() => {
						imgId === undefined || imgFile === undefined ? '' : request();
					}}
				>
					인증신청
				</button>
				<div className="bottom__text">
					※ 신분증 인증은 최초 1회만 실시합니다.
				</div>
			</article>
		</div>
	);
};

export default CertificationModal;
