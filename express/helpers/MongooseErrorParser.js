export const mongooseErrorParser = error => {
  console.error('Mongoose error: ', error);
  if (error && error.errors) {
    const errorMsg = Object.keys(error.errors).reduce((res, key) => {
      res.push({
        property: key,
        value: `${error.errors[key].value}`,
        message: error.errors[key].message
      });
      return res;
    }, []);
    return errorMsg;
  } else {
    return 'Something wrong while DB request';
  }
};
