import { fireStore, storage } from "../firebase/firebase";

export const deleteShopStorage = async (malls, mallId, shopId) => {
  console.log("Delete Shop Activated", malls, shopId);
  let filteredMall = malls.filter((x) => x.id === mallId);
  console.log("Deleted Shop", filteredMall);
  const deletedShop = filteredMall[0].shops.filter((x) => x.id === shopId);
  let remainingShops = filteredMall[0]?.shops?.filter((x) => x.id !== shopId);
  const shopImagesName = deletedShop[0]?.shopImages?.map(
    (img) => img.shopImgId
  );
  console.log(shopImagesName);
  try {
    if (shopImagesName.length > 0) {
      await Promise.all(
        shopImagesName?.map((img) =>
          storage
            .ref("shopImages")
            .child(img)
            .delete()
            .then(() => console.log("Image Deleted"))
        )
      );
    }
    await fireStore
      .collection("mallInfo")
      .doc(mallId)
      .update({ shops: [...remainingShops] })
      .then(() => {
        console.log("All task Done");
        window.location.reload();
      });
  } catch (e) {
    console.log(e);
  }
};
