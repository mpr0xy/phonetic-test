import metaData from './metadata';
const LearnList = [];
for (let i = 0; i < metaData.length; i = i + 4) {
  LearnList.push([
    metaData[i],
    metaData[i + 1],
    metaData[i + 2],
    metaData[i + 3]
  ]);
}
export const getPhoneticList = () => {
  const list = LearnList.map((item) => {
    // console.log(item[0]);
    const list = item.map((phonetic) => {
      if (!phonetic) {
        return null;
      }
      return `[${phonetic.name}]`;
    });
    return [...list.filter(item => item)];
  });
  console.log(list);
  return list;
};

const model = {};

export default model;
