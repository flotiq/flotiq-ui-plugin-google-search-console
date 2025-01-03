const cachedRelationData = {};

const getRelationData = (client, dataUrl) => {
  if (!dataUrl) return null;
  if (cachedRelationData[dataUrl]) return cachedRelationData[dataUrl];
  const { contentTypeName, id } = dataUrl.match(
    /(?<contentTypeName>[^/]+)\/(?<id>[^/]+)$/,
  ).groups;

  cachedRelationData[dataUrl] = client[contentTypeName]
    .get(id)
    .then(({ body }) => body);

  return cachedRelationData[dataUrl];
};

export { getRelationData };
