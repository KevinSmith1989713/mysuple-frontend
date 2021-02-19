import React,{ useState } from 'react';
import './ShowCase.scss';

import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import MypageSubHeader from '../../../components/MypageSubHeader/MypageSubHeader';
import Figure from '../../../components/Figure/Figure';
import {Figures} from '../../../assets/dummyData/FigureData';
import RewardRow from '../../../components/RewardRow/RewardRow';
import AccordionRow from '../../../components/AccordionRow/AccordionRow';
import AccordionContent from '../../../components/AccordionContent/AccordionContent';
import FigureModal from '../../../components/FigureModal/FigureModal';

const myFigure = [{figure_id:1, date:"2019-08-01"},{figure_id:3, date:"2019-11-28"}];

const ShowCase = ({ onClick }) => {

	const [nav, setNav] = useState(0);
	const [modal, isModalOpen] = useState(false);
	const callback = (count) => setNav(count);
	const openModal = () => isModalOpen(true);

	const closeModal = () => isModalOpen(false);
	

	return (
		<div className="ShowCase">
			<FigureModal isOpen={modal} close={()=>closeModal()}/>
			<ProfileTitle>나의 진열장</ProfileTitle>
			<MypageSubHeader 
				parentCallback={callback}
				tabs={[{id:'collection', title:"진열장" }, {id:'reward_history', title: '보상 히스토리'}]}/>
			{
				nav === 0 && (
					<div className="ProfileTitle--body collection">
						{
							Figures.map((figure, index) => {
								return (
									<Figure 
										className="figure"
										figureNum={figure.figure_id} 
										haveFigure={myFigure.includes(figure.figure_id)} 
										figureShadow={figure.figure_shadow}
										figureDuck={figure.figure_img}
										key={index}
										onClick={()=>openModal()}
									/>
								)
							}
						)}
					</div>
				)
			}	
			
			{
				nav === 1 && (
					<div className="ProfileTitle--body reward_history">
						<div className="reward__count">
							<div className="reward">
								<img/>
								<div className="count">3</div>
							</div>
							<div className="reward">
								<img/>
								<div className="count">2</div>
							</div>
							<div className="reward">
								<img/>
								<div className="count">122</div>
							</div>
						</div>
						<div className="reward__board">
							<div className="board__header">
								<div className="header date">일시</div>
								<div className="header text">내용</div>
								<div className="header reward">보상</div>
								<div className="header remark last">비고</div>
							</div>
							<AccordionRow type="reward" date="2019-05-01" content="보상되엇습니다" rewardType="스탬프" state={true} >
								<AccordionContent type="reward" title="보상되엇습니다" content="보상되엇습니다"/>
							</AccordionRow>
							<AccordionRow type="reward" date="2019-05-01" content="보상되엇습니다" rewardType="스탬프" state={false} >
								<AccordionContent type="reward" title="보상되엇습니다" content="보상되엇습니다"/>
							</AccordionRow>
						</div>
					</div>
				)
			}	
		</div>
	);
};

export default ShowCase;
