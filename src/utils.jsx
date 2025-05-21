
export const formatCurrency = (amount, option = ' ') => {
      if (isNaN(amount) || !amount) return 0;
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, option);
};
