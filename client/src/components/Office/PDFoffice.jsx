import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Button } from "antd";
import logo from "../../assets/logo2.png";
import MyThaiFont from "../../fonts/TH-Baijam-Italic.ttf";
Font.register({ family: "MyThaiFont", src: MyThaiFont });
import { createRoot } from "react-dom/client";

function PDFoffice(props) {
  let pdfName = `${props.actual[0].projectName} - ${props.actual[0].month}`;

  const styles = StyleSheet.create({
    page: {
      position: "relative",
      paddingTop: 50,
      paddingBottom: 80, // Space for the footer
    },
    logo: {
      width: 120,
      height: 100,
      marginLeft: 20, // กำหนด marginLeft เป็น 0 เพื่อให้ชิดซ้าย
    },
    text_headerTital: {
      fontSize: 20,
      fontFamily: "MyThaiFont",
      color: "black",
    },
    haederContainer: {
      width: "100%",
      height: 100,
      position: "relative",
      marginTop: -50,
    },
    bodyContainer: {
      width: "90%",
      height: "auto",
      border: "1px solid #000000",
      borderBottom: "0.5px solid #000000",
      //   borderTop: "0.5px solid #000000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0  auto",
    },
    titleContainer: {
      width: "90%",
      height: 20,
      border: "1px solid #000000",
      borderBottom: "None",
      display: "flex",
      flexDirection: "row",
      margin: "0  auto",
    },
    titleBlock1: {
      width: "15%",
      height: 20,
      borderRight: "1px solid #000000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    titleBlock2: {
      width: "33%",
      height: 20,
      borderRight: "1px solid #000000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    text_detail: {
      fontSize: 12,
      fontFamily: "MyThaiFont",
      color: "black",
    },
    inBodyContainer: {
      width: "100%",
      height: 20,
      borderBottom: "0.5px solid #000000",
      borderTop: "0.5px solid #000000",

      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#D1F5FF",
    },
    footerContainer: {
      width: "90%",
      height: 50,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin: "0  auto",
      marginTop: 50,
    },
    footerBlock: {
      width: "50%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const openPDFWindow = async () => {
    // กำหนดการดีเลย์ 3 วินาที
    setTimeout(() => {
      // ทำการรีเฟรชหน้าเมื่อดีเลย์เสร็จสิ้น
      window.location.reload();
    }, 3000); // 3000 มิลลิวินาที (3 วินาที)

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${pdfName}</title>
            </head>
            <body>
              <a id="pdf-download" download="${pdfName}.pdf"></a>
            </body>
          </html>
        `);
    const container = newWindow.document.createElement("div");
    newWindow.document.body.appendChild(container);
    const root = createRoot(container);
    //<Text style={{ ...styles.text_normal_topic, marginTop: 5 }}>

    // Render your PDF content into the root
    root.render(
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.haederContainer}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Image style={styles.logo} src={logo} />
                <View
                  style={{
                    //center
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80%",
                    // border: "1px solid #ff0000",
                  }}
                >
                  <Text style={styles.text_headerTital}>
                    บริษัท มิสเตอร์โกดัง จำกัด
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MyThaiFont",
                      color: "black",
                      //   marginLeft: "50",
                    }}
                  >
                    สรุป ค่าใช่จ่ายรายเดือน {props.actual[0].month}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MyThaiFont",
                      color: "black",
                    }}
                  >
                    โครงการ {props.actual[0].projectName}
                  </Text>
                </View>
              </div>
            </View>
            <View style={styles.titleContainer}>
              <View style={{ ...styles.titleBlock1, width: "7%" }}>
                <Text style={styles.text_detail}>ลำดับ</Text>
              </View>
              <View style={styles.titleBlock2}>
                <Text style={styles.text_detail}>รายละเอียดการ</Text>
              </View>

              <View style={styles.titleBlock1}>
                <Text style={styles.text_detail}>ยอดรวม</Text>
              </View>
              <View style={styles.titleBlock1}>
                <Text style={styles.text_detail}>จำนวน</Text>
              </View>
              <View style={styles.titleBlock1}>
                <Text style={styles.text_detail}>คงเหลือ</Text>
              </View>
              <View style={{ ...styles.titleBlock1, borderRight: "none" }}>
                <Text style={styles.text_detail}>หมายเหตุ</Text>
              </View>
            </View>

            <View style={styles.bodyContainer}>
              {props.master.map((item, index) => {
                return (
                  <View style={styles.inBodyContainer}>
                    <View style={{ ...styles.titleBlock1, width: "7%" }}>
                      <Text style={styles.text_detail}>
                        {index === 0 ? 1 : ""}
                      </Text>
                    </View>
                    <View style={styles.titleBlock2}>
                      <Text style={styles.text_detail}>{item.detail}</Text>
                    </View>
                    <View style={styles.titleBlock1}>
                      <Text style={styles.text_detail}>{item.qty}</Text>
                    </View>
                    <View style={styles.titleBlock1}>
                      <Text style={styles.text_detail}></Text>
                    </View>
                    <View style={styles.titleBlock1}>
                      <Text style={styles.text_detail}></Text>
                    </View>
                    <View
                      style={{ ...styles.titleBlock1, borderRight: "none" }}
                    >
                      <Text style={styles.text_detail}>{item.remark}</Text>
                    </View>
                  </View>
                );
              })}
              <View style={styles.inBodyContainer}>
                <View style={{ ...styles.titleBlock1, width: "7%" }}>
                  <Text style={styles.text_detail}></Text>
                </View>
                <View style={styles.titleBlock2}>
                  <Text style={styles.text_detail}>รวม</Text>
                </View>
                <View style={styles.titleBlock1}>
                  <Text style={styles.text_detail}>
                    {props.master[0].total_qty}
                  </Text>
                </View>
                <View style={styles.titleBlock1}>
                  <Text style={styles.text_detail}></Text>
                </View>
                <View style={styles.titleBlock1}>
                  <Text style={styles.text_detail}></Text>
                </View>
                <View style={{ ...styles.titleBlock1, borderRight: "none" }}>
                  <Text style={styles.text_detail}></Text>
                </View>
              </View>

              {props.actual.map((item, index) => {
                return (
                  <View
                    style={{
                      ...styles.inBodyContainer,
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <View style={{ ...styles.titleBlock1, width: "7%" }}>
                      <Text style={styles.text_detail}>{index + 2}</Text>
                    </View>
                    <View style={styles.titleBlock2}>
                      <Text style={styles.text_detail}>{item.detail}</Text>
                    </View>
                    <View style={styles.titleBlock1}>
                      <Text style={styles.text_detail}></Text>
                    </View>
                    <View style={styles.titleBlock1}>
                      <Text style={styles.text_detail}>{item.qty}</Text>
                    </View>
                    <View style={styles.titleBlock1}>
                      <Text style={styles.text_detail}>{item.remain}</Text>
                    </View>
                    <View
                      style={{ ...styles.titleBlock1, borderRight: "none" }}
                    >
                      <Text style={styles.text_detail}>{item.remark}</Text>
                    </View>
                  </View>
                );
              })}

              <View
                style={{
                  ...styles.inBodyContainer,
                  backgroundColor: "#ffffff",
                }}
              >
                <View style={{ ...styles.titleBlock1, width: "7%" }}>
                  <Text style={styles.text_detail}></Text>
                </View>
                <View style={styles.titleBlock2}>
                  <Text style={styles.text_detail}>รวมยอด</Text>
                </View>
                <View style={styles.titleBlock1}>
                  <Text style={styles.text_detail}>
                    {props.master[0].total_qty}
                  </Text>
                </View>
                <View style={styles.titleBlock1}>
                  <Text style={styles.text_detail}>
                    {" "}
                    {props.actual[0].total_qty}
                  </Text>
                </View>
                <View style={styles.titleBlock1}>
                  <Text style={styles.text_detail}>{props.remain}</Text>
                </View>
                <View style={{ ...styles.titleBlock1, borderRight: "none" }}>
                  <Text style={styles.text_detail}></Text>
                </View>
              </View>
            </View>

            <View style={styles.footerContainer}>
              <View style={styles.footerBlock}>
                <Text style={{ ...styles.text_detail, marginBottom: 5 }}>
                  _________________________________
                </Text>
                <Text style={styles.text_detail}>ผู้จัดทำ</Text>
              </View>
              <View style={styles.footerBlock}>
                <Text style={{ ...styles.text_detail, marginBottom: 5 }}>
                  _________________________________
                </Text>
                <Text style={styles.text_detail}>ผู้ตรวจสอบ</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      //  newWindow.document.getElementById('pdf-root')
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={openPDFWindow}
        style={{
          marginLeft: 10,
          backgroundColor: "#D4AC0D",
        }}
      >
        เอกสาร
      </Button>
    </>
  );
}

export default PDFoffice;
