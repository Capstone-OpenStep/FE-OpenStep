import React, { useState } from 'react';
import styled from 'styled-components';
import search from '../../assets/search.svg';

const Container = styled.div<{ isFilter: boolean }>`
  width: 1139px;
  height: 44px;
  background: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: ${(props) => (props.isFilter ? '0' : '15px')};
  border-bottom-right-radius: ${(props) => (props.isFilter ? '0' : '15px')};
  border: 1px #d0cece solid;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled.img`
  position: relative;
  height: 24px;
  left: 16px;
`;

const FilterToggle = styled.div`
  width: 70px;
  position: relative;
  left: 45px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.07);
  }
`;

const InputFiled = styled.div`
  width: 1000px;
  height: 95%;
  left: 30px;
  position: relative;
  cursor: pointer;
`;

const ToggleText = styled.div`
  position: relative;
  color: black;
  font-size: 18px;
  font-family: Inter;
  font-weight: 500;

  &:hover {
    font-weight: 600;
  }
`;

const FilterContainer = styled.div`
  width: 1139px;
  height: 120px;
  padding-left: 18px;
  padding-top: 11px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px rgba(0, 0, 0, 0.2) solid;
`;

const Row = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
`;

const Label = styled.div`
  color: black;
  font-size: 18px;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  word-wrap: break-word;
`;

const Capsule = styled.div<{ selected?: boolean }>`
  min-width: 65px;
  height: 22px;
  padding: 11px 16px;
  background: ${({ selected }) =>
    selected ? 'rgba(83, 83, 255, 0.85)' : '#D9D9D9'};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.08);
    background: ${({ selected }) =>
    selected ? 'rgba(60, 60, 230, 1)' : '#B0B0B0'};
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CapsuleText = styled.div`
  color: var(--Font-text-white, white);
  font-size: 14px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ActiveFilter = styled(Capsule)`
  padding-right: 12px;
  gap: 5px;
  background: rgba(102, 110, 255, 0.75);

  &:hover {
    transform: scale(1.08);
    background: rgba(60, 60, 230, 1);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const RemoveIcon = styled.div`
  width: 10px;
  height: 22px;
  text-align: center;
  color: black;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Filter = () => {
  // 상태로 선택된 필터 값을 관리합니다.
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedUpdate, setSelectedUpdate] = useState<string | null>(null);

  // 타입 필터 클릭 핸들러
  const handleTypeClick = (value: string) => {
    setSelectedType((prev) => (prev === value ? null : value));
  };

  // 업데이트 필터 클릭 핸들러
  const handleUpdateClick = (value: string) => {
    setSelectedUpdate((prev) => (prev === value ? null : value));
  };

  return (
    <FilterContainer>
      {/* 유형 필터 */}
      <Row>
        <Label style={{ width: 39, height: 25 }}>유형</Label>
        <Capsule
          selected={selectedType === '레포지토리'}
          onClick={() => handleTypeClick('레포지토리')}
        >
          <CapsuleText>레포지토리</CapsuleText>
        </Capsule>
        <Capsule
          selected={selectedType === '이슈'}
          onClick={() => handleTypeClick('이슈')}
        >
          <CapsuleText>이슈</CapsuleText>
        </Capsule>
      </Row>
      {/* 마지막 업데이트 필터 */}
      <Row>
        <Label style={{ width: 125, height: 26 }}>마지막 업데이트</Label>
        <Capsule
          selected={selectedUpdate === '1주'}
          onClick={() => handleUpdateClick('1주')}
        >
          <CapsuleText>1주</CapsuleText>
        </Capsule>
        <Capsule
          selected={selectedUpdate === '1개월'}
          onClick={() => handleUpdateClick('1개월')}
        >
          <CapsuleText>1개월</CapsuleText>
        </Capsule>
        <Capsule
          selected={selectedUpdate === '3개월'}
          onClick={() => handleUpdateClick('3개월')}
        >
          <CapsuleText>3개월</CapsuleText>
        </Capsule>
        <Capsule
          selected={selectedUpdate === '1년'}
          onClick={() => handleUpdateClick('1년')}
        >
          <CapsuleText>1년</CapsuleText>
        </Capsule>
      </Row>
      {/* 선택된 필터 항목 표시 */}
      <Row>
        {selectedType && (
          <ActiveFilter onClick={() => setSelectedType(null)}>
            <CapsuleText>{selectedType}</CapsuleText>
            <RemoveIcon>x</RemoveIcon>
          </ActiveFilter>
        )}
        {selectedUpdate && (
          <ActiveFilter onClick={() => setSelectedUpdate(null)}>
            <CapsuleText>{selectedUpdate}</CapsuleText>
            <RemoveIcon>x</RemoveIcon>
          </ActiveFilter>
        )}
      </Row>
    </FilterContainer>
  );
};

interface SearchBarProps {
  mode: number;
  query: string;
  setMode: React.Dispatch<React.SetStateAction<number>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ mode, query, setMode, setQuery }) => {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const toggle = () => {
    setIsFilter((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQuery(searchText);
      setMode(2);
    }
  };

  return (
    <>
      <Container isFilter={isFilter}>
        <SearchIcon src={search} />
        <InputFiled>
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchText}
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'Noto Sans KR',
              fontSize: 20,
              paddingLeft: 10,
              border: 'none',
              outline: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 0 0px rgba(83,83,255,0)', // 기본 상태
            }}
            onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              '0 0 0 3px rgba(83, 83, 255, 0.4)')
            }
            onBlur={(e) =>
              (e.currentTarget.style.boxShadow = '0 0 0px rgba(83,83,255,0)')
            }
          />
        </InputFiled>
        <FilterToggle onClick={toggle}>
          <ToggleText>+</ToggleText>
          <ToggleText>필터</ToggleText>
        </FilterToggle>
      </Container>
      {isFilter && <Filter />}
    </>
  );
};

export default SearchBar;
