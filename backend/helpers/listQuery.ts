import { LIST_MESSAGE_PAYLOAD_TYPE } from "../types/message.type";

const listQuery = async (payload: LIST_MESSAGE_PAYLOAD_TYPE, Modal: any) => {
  const { options } = payload;

  let query = Modal.find({});

  if (options && options.pagination && options.page && options.limit) {
    const skipCount =
      (options.page || 1) > 1 ? (options.page - 1) * (options.limit || 10) : 0;
    const limitCount = options.limit || 10;
    query = query.skip(skipCount).limit(limitCount);
  }

  if (options && options.orderBy) {
    query = query.sort(options.orderBy);
  }

  if (options && options.populate) {
    query = query.populate(options?.populate);
  }

  const queryModal = await query.lean();
  const totalCount = await Modal.countDocuments();

  const hasNextPage =
    options && options.pagination
      ? (options.page || 1) * (options.limit || 10) < totalCount
      : false;

  return { list: queryModal, hasNextPage, totalRows: totalCount };
};

module.exports = listQuery;
