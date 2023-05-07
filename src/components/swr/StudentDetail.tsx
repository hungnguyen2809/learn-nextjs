import React from 'react';
import useSWR from 'swr';
import Loading from '../Loading';
import Button from '../Button';

type Props = {
  studentId: string;
};

export const StudentDetail = ({ studentId }: Props) => {
  const { data, error, mutate, isLoading, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: 3000, // sau 3s nếu mà hook này đc thêm mới thì nó sẽ call lại, còn trc 3s thì nó lấy nguyên data cũ
    // revalidateOnMount: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleMutate = () => {
    mutate({ author: 'hungnv28' }); // tham số thứ 2 là true, hoặc obj, nó sẽ trigger call api và sử dụng data truyêng vào để hiển thị
  };

  return (
    <div className="mb-5">
      StudentDetail: <b>{data?.name || 'no name'}</b>
      <Button onClick={handleMutate} type="blue">
        mutate
      </Button>
    </div>
  );
};
