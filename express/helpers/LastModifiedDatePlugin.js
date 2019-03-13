module.exports = exports = function lastModifiedPlugin (schema) {
  schema.add({ lastModifiedDate: Date });

  const updateDate = function (next) {
    this.lastModifiedDate = new Date();
    next();
  };

  schema.pre('save', updateDate)
    .pre('update', updateDate)
    .pre('findOneAndUpdate', updateDate)
    .pre('findByIdAndUpdate', updateDate);
};
