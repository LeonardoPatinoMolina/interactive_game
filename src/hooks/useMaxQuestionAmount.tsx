import { useGetVerifyConfigQuery } from "../context/api/apiVerifyCofigSlice";

type useMaxQuestionAmoutReturns = {
  totalAmount: any;
  isSuccess: boolean;
  isLoading: boolean;
  getMaxAmount: ()=>void;
}

export const useMaxQuestionAmout = (category: string): useMaxQuestionAmoutReturns => {
  const { 
    isLoading, 
    isSuccess, 
    isError, 
    error,
    refetch, 
    data } = useGetVerifyConfigQuery(category);
  if(isError) console.error(error);
  
  const getMaxAmount = ()=>{
    refetch()
  }

  return { 
    totalAmount: data,
    isSuccess,
    isLoading,
    getMaxAmount };
};
