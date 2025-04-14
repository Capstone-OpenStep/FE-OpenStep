import React from 'react';
import styles from './IssueDescription.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css'; // github-markdown-css 패키지 설치 필요 (npm install github-markdown-css)


const markdownContent: string = `
## Description

> 어떤 버그인지 간결하게 설명해주세요

## To Reproduce

> 에러가 발생한 상황을 절차순으로 적어주세요 
> 혹은 에러가 발생한 코드와 그 입력에 대해서 구체적으로 적어주세요

## Expected Results

> 예상했던 정상적인 결과가 어떤 것이었는지 설명해주세요

## References(optional)

`;

const IssueDescription = () => {
    return (
        <div style={{ width: 680, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
            <div style={{ alignSelf: 'stretch', height: 40, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#5353FF', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>[CI] ILMHistoryItemTests testTruncateLongError failing</div>
            <div style={{ alignSelf: 'stretch', height: 37, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: 24, wordWrap: 'break-word' }}>이슈 내용을 요약했어요</div>
            <div style={{
                background: '#fff',
                borderRadius: 10,
                width: 680,
                display: 'inline-flex',
                flexDirection: 'column',
                flexWrap: 'wrap',         // 여기 추가
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
            }}>
                <div style={{ maxWidth: 653, margin: 14, color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: 1.4, wordWrap: 'break-word' }}>Elasticsearch 8.12에서 max_concurrent_shard_requests 설정이 비동기 검색(async search)에서 적용되지 않아, 설정했음에도 제한 없이 샤드 요청이 발생하는 문제입니다. 현재 이 설정은 동기 검색에만 영향을 미칩니다.</div>
            </div>
            <div style={{ alignSelf: 'stretch', height: 37, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: 24, wordWrap: 'break-word' }}>상세 내용은 다음과 같아요</div>
            <div style={{ width: 680, minHeight: 521, paddingLeft: 20, paddingRight: 20, paddingTop: 26, paddingBottom: 26, background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)', borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
                <div className={`markdown-body ${styles.markdownBody}`} style={{ width: 653, minHeight: 450, color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>
                    <ReactMarkdown
                        children={markdownContent}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    />
                </div>
            </div>
            <div style={{ width: 680, height: 61, paddingTop: 13, paddingBottom: 13, paddingLeft: 565, paddingRight: 14, background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)', borderRadius: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
                <div style={{ width: 100, height: 35, paddingLeft: 15, paddingRight: 15, background: '#4366F2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
                    <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>기여 시작</div>
                </div>
            </div>
        </div>
    );
};

export default IssueDescription;
