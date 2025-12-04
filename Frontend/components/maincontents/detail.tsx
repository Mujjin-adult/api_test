import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Linking, Platform, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";
import { Notice, getNoticeDetail } from "../../services/crawlerAPI";
import { useBookmark } from "../../context/BookmarkContext";

// 네이티브 플랫폼에서만 WebView 사용
let WebView: any = null;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").WebView;
}

export default function Detail() {
  const route = useRoute();
  const params = route.params as { notice?: Notice } | undefined;

  const { isBookmarked, toggleBookmark } = useBookmark();
  const [notice, setNotice] = useState<Notice | null>(params?.notice || null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewLoading, setWebViewLoading] = useState(true);

  // 공지사항 상세 정보 불러오기 (API 사용)
  const fetchNoticeDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await getNoticeDetail(id);
      if (result.success && result.data) {
        setNotice(result.data);
      }
    } catch (error) {
      console.error("공지사항 상세 조회 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // content가 없으면 API로 상세 조회
    if (notice && !notice.content) {
      fetchNoticeDetail(notice.id);
    }
  }, []);

  const handleBookmark = async () => {
    if (!notice) return;
    try {
      const wasBookmarked = isBookmarked(notice.id);
      await toggleBookmark(notice);
      alert(wasBookmarked ? "북마크에서 제거되었습니다." : "북마크에 추가되었습니다.");
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
    }
  };

  // 공유 탭 띄우기 함수
  const handleShare = async (title: string) => {
    try {
      await Share.share({
        message: `${title}\n\n띠링인캠퍼스에서 확인하세요!`,
        title: title,
      });
    } catch (error) {
      console.error("공유 오류:", error);
    }
  };

  const swipe = () => {
    if (!notice) return null;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          borderRadius: 12,
          marginRight: 0,
        }}
        onPress={() => handleShare(notice.title)}
      >
        {/* 북마크 아이콘 */}
        <TouchableOpacity
          style={{
            zIndex: 10,
            elevation: 10,
            position: "relative",
          }}
          onPress={(e) => {
            e.stopPropagation();
            handleBookmark();
          }}
        >
          <Image
            source={
              isBookmarked(notice.id)
                ? require("../../assets/images/bookmark2.png")
                : require("../../assets/images/bookmark.png")
            }
            style={{
              width: 20,
              height: 20,
              tintColor: "white",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        {/* 공유하기 버튼 */}
        <Image
          source={require("../../assets/images/export.png")}
          style={{
            width: 27,
            height: 27,
            resizeMode: "contain",
            marginBottom: 25,
          }}
        />
      </TouchableOpacity>
    );
  };

  if (!notice) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Pretendard-Light", fontSize: 16, color: "#999" }}>
          공지사항을 찾을 수 없습니다
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3366FF" />
        <Text style={{ fontFamily: "Pretendard-Regular", fontSize: 14, marginTop: 10 }}>
          불러오는 중...
        </Text>
      </View>
    );
  }

  // WebView 모드
  if (showWebView && notice?.url) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* 상단 헤더 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity onPress={() => setShowWebView(false)}>
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 14,
                color: "#3366FF",
              }}
            >
              ← 돌아가기
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 12,
              color: "#666",
              flex: 1,
              textAlign: "center",
              marginHorizontal: 10,
            }}
            numberOfLines={1}
          >
            {notice.title}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Linking.openURL(notice.url!);
              } catch (error) {
                console.error("URL 열기 오류:", error);
              }
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 14,
                color: "#3366FF",
              }}
            >
              브라우저
            </Text>
          </TouchableOpacity>
        </View>

        {/* WebView 로딩 인디케이터 */}
        {webViewLoading && (
          <View
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              zIndex: 10,
            }}
          >
            <ActivityIndicator size="large" color="#3366FF" />
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: 14,
                marginTop: 10,
                color: "#666",
              }}
            >
              페이지 로딩 중...
            </Text>
          </View>
        )}

        {/* WebView (네이티브) 또는 iframe (웹) */}
        {Platform.OS === "web" ? (
          <iframe
            src={notice.url}
            style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
            onLoad={() => setWebViewLoading(false)}
          />
        ) : (
          WebView && (
            <WebView
              source={{ uri: notice.url }}
              style={{ flex: 1 }}
              onLoadStart={() => setWebViewLoading(true)}
              onLoadEnd={() => setWebViewLoading(false)}
              onError={(syntheticEvent: any) => {
                const { nativeEvent } = syntheticEvent;
                console.error("WebView 오류:", nativeEvent);
                setWebViewLoading(false);
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              originWhitelist={["*"]}
              // iOS: 파일 다운로드 링크 감지
              onShouldStartLoadWithRequest={(request: any) => {
                const url = request.url;
                if (url.match(/\.(pdf|hwp|hwpx|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|png|jpg|jpeg|gif)(\?.*)?$/i)) {
                  Linking.openURL(url);
                  return false;
                }
                if (url.includes("download") || url.includes("fileDown") || url.includes("attachFile") || url.includes("atchmnfl")) {
                  Linking.openURL(url);
                  return false;
                }
                return true;
              }}
              // Android: URL 변경 감지
              onNavigationStateChange={(navState: any) => {
                const url = navState.url;
                if (url.match(/\.(pdf|hwp|hwpx|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z)(\?.*)?$/i)) {
                  Linking.openURL(url);
                }
                if (url.includes("download") || url.includes("fileDown") || url.includes("attachFile") || url.includes("atchmnfl")) {
                  Linking.openURL(url);
                }
              }}
              // Android: Blob/다운로드 URL 처리
              onFileDownload={({ nativeEvent }: any) => {
                Linking.openURL(nativeEvent.downloadUrl);
              }}
            />
          )
        )}
      </View>
    );
  }

  // 기본 상세 화면
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
            <Text
              style={{
                fontFamily: "Pretendard-regular",
                fontSize: 15,
                flex: 1,
              }}
            >
              {notice.title}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Pretendard-Light",
              fontSize: 12,
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            {new Date(notice.publishedAt || notice.date || new Date()).toLocaleDateString("ko-KR")}
            {notice.author && (
              <Text
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: 12,
                  marginLeft: 8,
                }}
              >
                · {notice.author}
              </Text>
            )}
            {(notice.categoryCode || notice.category) && (
              <Text
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: 12,
                  color: "#ffffff",
                  marginLeft: 8,
                  paddingHorizontal: 4,
                  paddingTop: 1,
                  paddingBottom: 1,
                  lineHeight: 14,
                  borderRadius: 5,
                  backgroundColor: "#8e8e8e",
                }}
              >
                {notice.categoryCode || notice.category}
              </Text>
            )}
            <Text
              style={{
                fontFamily: "Pretendard-Light",
                fontSize: 12,
                marginTop: 10,
                marginBottom: 0,
                marginLeft: 8,
              }}
            >
              조회 {notice.viewCount || 0}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => handleBookmark()}>
            <Image
              source={
                isBookmarked(notice.id)
                  ? require("../../assets/images/bookmark2.png")
                  : require("../../assets/images/bookmark.png")
              }
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare(notice.title)}>
            <Image
              source={require("../../assets/images/export.png")}
              style={{
                width: 27,
                height: 27,
                resizeMode: "contain",
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontFamily: "Pretendard-regular",
            fontSize: 16,
            marginLeft: 15,
            marginRight: 15,
            lineHeight: 24,
          }}
        >
          {notice.content || "내용을 불러올 수 없습니다."}
        </Text>

        {/* 첨부파일 */}
        {notice.attachments && (
          <View
            style={{
              marginTop: 20,
              marginLeft: 15,
              marginRight: 15,
              padding: 15,
              backgroundColor: "#f9f9f9",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 14,
                marginBottom: 8,
                color: "#333",
              }}
            >
              첨부파일
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: 13,
                color: "#666",
                lineHeight: 20,
              }}
            >
              {notice.attachments}
            </Text>
          </View>
        )}

        {/* 출처 */}
        {notice.source && (
          <View
            style={{
              marginTop: 10,
              marginLeft: 15,
              marginRight: 15,
              padding: 12,
              backgroundColor: "#f0f7ff",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: 12,
                color: "#3366FF",
              }}
            >
              출처: {notice.source}
            </Text>
          </View>
        )}

        {/* 원문 보기 버튼 */}
        {notice.url && (
          <TouchableOpacity
            style={{
              marginTop: 20,
              marginLeft: 15,
              marginRight: 15,
              padding: 15,
              backgroundColor: "#3366FF",
              borderRadius: 8,
            }}
            onPress={() => setShowWebView(true)}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 14,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              원문 보기 (WebView)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
