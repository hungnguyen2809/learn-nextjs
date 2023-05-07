import { Button } from '@/components';
import { StudentDetail } from '@/components/swr';
import React, { useState } from 'react';

const SwrPage = () => {
  const [detailList, setDetailList] = useState([1, 1, 1]);

  const addDetail = () => {
    const newList = [...detailList, 1];
    setDetailList(newList)
  };

  return (
    <div>
      <h1 className="text-2xl">SwrPage</h1>

      <div className="text-center">
        <Button onClick={addDetail}>Add Detail</Button>
      </div>

      <ul className="mt-20">
        {detailList.map((item) => (
          <li key={item}>
            <StudentDetail studentId="lea11ziflg8xoizb" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SwrPage;
