import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { changeStatusProduct, deleteProduct } from '../admin/service/Product';

const useMultipleSelect = ({ data, on, refresh, fnDeleteMultiple, fnChangeStatusMultiple }) => {
  const [checkedStates, setCheckedStates] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false)
  useEffect(() => {
    setCheckedStates([])
  }, [refresh])
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsCheckAll(true)
      setCheckedStates(() => {
        return data.map((item) => item.id)
      });
    } else {
      setIsCheckAll(false)
      setCheckedStates([])
    }
  };
  const handleCheck = (e) => {
    const { value } = e.target
    const is = checkedStates.includes(Number(value));
    if (!is) {
      setCheckedStates([...checkedStates, Number(value)]);
    } else {
      setCheckedStates(checkedStates.filter((item) => item !== Number(value)))
    }
  };
  const handleMultiple = async (action, value) => {
    const is = window.confirm('Are you sure?');
    if (!is) return;
    if (checkedStates.length === 0) {
      toast.error('Please select at least one item to ');
      return;
    }
    try {
      if (action === "delete") {
        toast.promise(
          fnDeleteMultiple({
            listId: checkedStates
          }),
          {
            loading: "Đang tải...",
            success: "Thêm vô thùng rác thành công",
            error: "Lỗi không xóa được",
          }
        )

      } else if (action === "status") {
        toast.promise(
          fnChangeStatusMultiple({
            listId: checkedStates,
            value: value
          }),
          {
            loading: "Đang tải...",
            success: "Cập nhật trạng thái thành công",
            error: "Lỗi !",
          }
        )

      }
      // refresh lai trang và cập nhật lại
      on()
      setCheckedStates([]);
      setIsCheckAll(false)
    } catch (error) {
      console.error('Error data:', error);
    }
  };

  return { checkedStates, handleCheckAll, handleMultiple, handleCheck, isCheckAll };
};

export default useMultipleSelect;