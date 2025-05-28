
export const formatCurrency = (amount, option = ' ') => {
      if (isNaN(amount) || !amount) return 0;
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, option);
};



export const formatPhoneNumber = (phoneNumber) => {
      if (!phoneNumber) return ''; // Null yoki undefined bo'lsa, bo'sh string qaytaramiz
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
};

