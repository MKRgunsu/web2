/**
 * Defines the structure for a single content item used across CMS categories.
 */
export interface ContentItem {
  id: number;
  title: string;
  text?: string;
  content?: string; // For IR data, can be merged with text
  date?: string;
  order?: number;
  link?: string;
  buttonText?: string;
  image?: string;
  weight?: 'bold' | 'normal'; // For press items
  openInNewTab?: boolean; // 새 탭에서 열기 설정
}

/**
 * Defines the structure for all settings managed in the admin panel.
 */
export interface AdminState {
  prices?: {
    haru?: { price?: string; link?: string; available?: boolean };
    heartsend?: {
      price?: string;
      link?: string;
      available?: boolean;
      // 하트센드 옵션별 설정
      options?: {
        // 완전 대필: 처음부터 대신 써주는 것
        fullGhostwriting?: {
          enabled?: boolean;
          price?: string;
          link?: string;
          description?: string;
        };
        // 수정 대필: 편지 내용 주면 다듬어서 보내주는 것
        editGhostwriting?: {
          enabled?: boolean;
          price?: string;
          link?: string;
          description?: string;
        };
      };
    };
    b2b?: { available?: boolean; email?: string; info?: string };
  };
  content?: {
    brandStory?: ContentItem[];
    press?: ContentItem[];
    careers?: ContentItem[];
    events?: ContentItem[];
    faq?: ContentItem[];
    ir?: ContentItem[];
    noticeBoard?: ContentItem[]; // 신규 공지사항 게시판
  };
  cookieSettings?: {
    enabled?: boolean;
    mode?: 'once' | 'always' | 'none';
  };
  banner?: {
    showTop?: boolean;
    top?: {
      message?: string;
      link?: string;
      linkType?: 'internal' | 'external';
      buttonText?: string;
      showButton?: boolean;
      color?: string;
      type?: 'none' | 'normal' | 'trip' | 'cs' | 'temp'
    };
    showBottom?: boolean;
    bottom?: {
      message?: string;
      link?: string;
      linkType?: 'internal' | 'external';
      buttonText?: string;
      showButton?: boolean;
      color?: string;
    };
    showPopup?: boolean;
    popup?: {
      title?: string;
      message?: string;
      link?: string;
      linkType?: 'internal' | 'external';
      buttonText?: string;
      showButton?: boolean;
    };
    lastModified?: string;
  };
  cta?: {
    mainContactEmail?: string;
    additionalInquiryLink?: string;
    contactPartner?: string;
    // CTA 버튼 설정 - 각 버튼마다 이메일 또는 링크 선택 가능
    homeProposal?: {
      type: 'email' | 'link';
      value: string; // email 주소 또는 URL
    };
    homeInquiry?: {
      type: 'email' | 'link';
      value: string;
    };
    collabButton?: {
      type: 'email' | 'link';
      value: string;
    };
    footerContact?: {
      type: 'email' | 'link';
      value: string;
    };
  };
}
