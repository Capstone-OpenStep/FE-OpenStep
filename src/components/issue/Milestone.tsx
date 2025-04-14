import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  top: 50px;
  width: 372px;
  height: 156px;
  margin: 0 auto;
`;

// 각 원(circle)의 스타일 (좌표와 상태에 따라 스타일 변경)
const Circle = styled.div<{ left: number; top: number; status: 'inactive' | 'current' | 'done' }>`
  position: absolute;
  width: 69px;
  height: 66px;
  border-radius: 9999px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.10);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  background: ${(props) =>
    props.status === 'current' ? 'white' : props.status === 'done' ? '#5562F8' : '#FAFAFA'};
  border: ${(props) => (props.status === 'current' ? '3px solid #5562F8' : 'none')};
`;

// 원 내부 텍스트 스타일 (상태에 따라 글자 색상이 변경)
const CircleLabel = styled.span<{ status: 'inactive' | 'current' | 'done' }>`
  color: ${(props) =>
    props.status === 'current' ? '#5562F8' : props.status === 'done' ? '#fff' : '#ABABAB'};
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  text-align: center;
`;

const EdgesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 32px;
  position: absolute;
  width: 279px;
  height: 45.75px;
  z-index: 1;
  left: 46.5px;
  top: 60px;
`;

// 각 edge의 스타일: active이면 파란색, 아니면 회색, 좌우에 따라 회전 적용
const Edge = styled.div<{ direction: 'left' | 'right'; active: boolean }>`
  width: 61.53px;
  height: 3.17px;
  background: ${(props) => (props.active ? '#5562F8' : 'rgba(208, 208, 208, 0.72)')};
  transform: rotate(${(props) => (props.direction === 'left' ? '45deg' : '-45deg')});
`;

const circlePositions = [
  { left: 0, top: 0 },
  { left: 72, top: 90 },
  { left: 150, top: 0 },
  { left: 227, top: 90 },
  { left: 303, top: 0 },
];

const labels = ['이슈', '작업', 'PR', '리뷰', '병합'];


interface MilestoneProps {
  currentStage : number
}


const Milestone: React.FC<MilestoneProps> = ({ currentStage }) => {

  return (
    <Container>
      {/* 단계별 원(circle) 렌더링 */}
      {labels.map((label, index) => {
        let status: 'inactive' | 'current' | 'done';
        if (currentStage === index + 1) {
          status = 'current';
        } else if (currentStage > index + 1) {
          status = 'done';
        } else {
          status = 'inactive';
        }
        const pos = circlePositions[index];
        return (
          <Circle key={index} left={pos.left} top={pos.top} status={status}>
            <CircleLabel status={status}>{label}</CircleLabel>
          </Circle>
        );
      })}

      {/* 원들을 잇는 edge 렌더링 */}
      <EdgesContainer>
        {[0, 1, 2, 3].map((edgeIndex) => {
          const active = currentStage > edgeIndex + 1;
          const direction = edgeIndex % 2 === 0 ? 'left' : 'right';
          return <Edge key={edgeIndex} direction={direction} active={active} />;
        })}
      </EdgesContainer>
    </Container>
  );
};

export default Milestone;
