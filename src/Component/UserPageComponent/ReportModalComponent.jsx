import React from 'react';

const ReportModal = ({ reporter, reported }) => {
  return (
    <>
      <p>
        신고자: {reporter}
        <br />
        신고대상: {reported}
      </p>

      <p>내용</p>
      <textarea rows="4" cols="50" placeholder="신고 내용을 입력하세요..."></textarea>
    </>
  );
};

export default ReportModal;
