import React ,{ useEffect , useState} from "react";
import SkeletonComponent from "../components/SkeletonComponent/SkeletonComponent";


function BackofficePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* {loading ? (
        <>
          <SkeletonComponent />
        </>
      ) : (
        <>
          <Title level={2}>รายละเอียดค่าใช้จ่ายโครงการ</Title>
        </>
      )} */}
    </>
  );
}

export default BackofficePage;
