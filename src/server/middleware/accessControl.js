const isOwner = (resourceOwnerId, currentUserId) => {
  return resourceOwnerId.toString() === currentUserId.toString();
};

export default isOwner;