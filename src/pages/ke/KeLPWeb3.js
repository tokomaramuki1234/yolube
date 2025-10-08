import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUsers, faCalendarAlt, faMapMarkerAlt, faClock, faHeart, faBars, faTimes, faChevronUp, faChevronLeft, faChevronRight, faGlobe } from '@fortawesome/free-solid-svg-icons';
import GoogleSheetsService from '../../services/googleSheets';
import ReservationForm from '../../components/ReservationForm';
import ReservationStatus from '../../components/ReservationStatus';
import './KeLP.css';

const KeLPWeb3 = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('ja');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [eventData, setEventData] = useState({
    eventCount: '第57回',
    date: { month: '7月', day: '26日', weekday: '土' },
    venue: '秋田ベイパラダイス',
    venueAddress: '秋田県秋田市土崎港西1-10-45'
  });
  const [eventLoading, setEventLoading] = useState(true);

  // 多言語テキストデータ
  const translations = {
    ja: {
      nav: {
        about: 'イベントについて',
        schedule: '開催スケジュール',
        access: 'アクセス',
        contact: 'お問い合わせ'
      },
      hero: {
        title1: '世界中のテーブルゲームで',
        title2: '遊ぼう！',
        badge1: '参加費無料',
        badge2: '初参加・未経験者歓迎',
        badge3: '年齢性別関係なし！',
        aboutTitle: 'テーブルゲーム交流会：Ke.<span class="mobile-br"><br></span>について',
        description1: 'テーブルゲーム交流会：Ke.は年齢、世代、立場を問わず遊べる交流会です。',
        description2: '「ルールが難しそう...」「ついていけるかな？」そんな心配は無用！経験豊富なスタッフが一からやさしく教えるので、未経験者でも安心して楽しめます。新しい友達づくりや、50代以上の方の新しい趣味探しにもぴったり！３才から９０才まで幅広い年齢層からご参加いただいています。',
        description3: 'スマホから離れて顔を合わせ、みんなでワイワイ盛り上がってみませんか？普段出会えない世代の方との交流も、ゲームを通して自然と生まれます。頭を使う戦略ゲームから、みんなで笑えるパーティーゲームまで、様々な種類をご用意しています。',
        description4: 'まずは見学からでもOK！秋田の新しいコミュニティスペースで、心温まる交流のひとときを一緒に過ごしませんか？',
        btn1: '次回イベントに参加する',
        btn2: 'SNSで最新の情報をキャッチ'
      },
      sponsors: {
        cooperation: '協力',
        support: '後援'
      },
      gallery: {
        title: 'イベントの様子',
        captions: [
          'お子様からご高齢者様まで、年齢関係なく楽しめます！',
          'YOLUBEの活動は「け」以外のイベントにもご招待いただいております。',
          'YOLUBEの活動は「け」以外のイベントにもご招待いただいております。',
          '名作「ticket to the ride」',
          '1960年代に日本へ上陸した「レーダー作戦ゲーム」も遊べます',
          'ゲームによっては自分なりにアレンジして楽しめる。これもテーブルゲームの魅力。'
        ]
      },
      problem: {
        title: 'こんなお悩み<span class="mobile-br"><br /></span>ありませんか？',
        items: [
          { title: '新しい友達が欲しい', desc: '秋田で新しい友達を作りたいけど、なかなか出会いの場がない...' },
          { title: 'テーブルゲームに興味がある', desc: 'テーブルゲームをやってみたいけど、ルールがわからない、一緒にやる人がいない...' },
          { title: '週末の過ごし方がマンネリ', desc: 'いつも同じことの繰り返しで、新しい趣味や楽しみを見つけたい...' }
        ]
      },
      solution: {
        title: 'そんなあなたに<span class="mobile-br"><br /></span>おススメです！',
        lead: 'テーブルゲームはコミュニケーションを楽しむゲーム。画面越しではなく<strong>「リアルな人とのつながり」</strong>を楽しめます。<br />相手の表情や声のトーン、その場の空気感や予想外の出来事など、様々な人の意外な一面をうかがえる場です。<br />赤の他人同士が数分後には打ち解けていたりする、不思議な魅力をもつ遊び。それがテーブルゲームです。',
        features: [
          { title: '五感を使った豊かな体験', desc: '駒を手で動かす触感、みんなの笑い声、普段は考えもしない行動の連続。その場の雰囲気を全身で楽しめます。' },
          { title: '自然な出会いと友達作り', desc: 'ゲームを通じて自然に会話が生まれ、立場を超えた新しい交流が生れます。日常の喧騒から離れ、自然体で遊んでみましょう。' },
          { title: '初心者も安心サポート', desc: 'ゲーム選びは非常に重要！スタッフが参加者の経験や好みからベストなゲームをご提案します！' }
        ]
      },
      flow: {
        title: '当日の流れ',
        steps: [
          { number: 'STEP 1', title: '受付・会場到着', desc: 'まずは受付にて参加登録！その後、ゲーム中で呼び合うための「ニックネームを書いた名札」を作成！' },
          { number: 'STEP 2', title: 'ゲーム選定', desc: '150種類以上のゲーム＋参加者の持ち込みゲームがいっぱい！初めてのお方はスタッフにお声かけください！年齢やご経験をもとにお勧めのゲームを提案いたします！また、ゲームを遊ぶ上での人数調整もサポート致します！' },
          { number: 'STEP 3', title: 'ルール学習＆ゲームプレイ', desc: '説明書を読むか、外箱の右下にあるQRからルール説明動画を視聴してルールを学習！もしも不安であればスタッフへお声かけください！初心者にはスタッフがルール説明致します。あとはどんどん遊んでみましょう！気付けば数時間経っていることも・・ 笑' },
          { number: 'STEP 4', title: '片づけ＆退出', desc: '遊び終わったゲームは片づけましょう！もしも片づけ方が分からない場合はお近くのスタッフにお声かけください！<br />たくさんの参加者に遊んでいただくためにも、ゲームは１作品ずつ遊ぶようご協力願います！<br />入退出は自由です。お帰りの際は名札を受付にお返しください。' }
        ]
      },
      testimonials: {
        title: '参加者の声',
        items: [
          { age: '60代男性', text: '秋田にこんなイベントがあるなんて知らなかった！囲碁や将棋だけかと思っていましたが沢山のゲームに驚きました。' },
          { age: '40代男性', text: '転勤族ですが、ここで友だちができました。また遊びに来ます！' },
          { age: '30代女性', text: 'ゲーム初心者の親子でも楽しめました！' },
          { age: '10代男性', text: 'ぜんぶ楽しかった！' },
          { age: '40代女性', text: '子どもがボードゲームをつかって遊ぶ場があるといいなぁと思っていたので、すごく楽しかったです。' },
          { age: '20代女性', text: '程よく難しく、シンプルに遊べるのがよかった。人と楽しくコミュニケーションとれる感じがよかった。' }
        ]
      },
      faq: {
        title: 'よくある質問',
        items: [
          { q: '本当に参加費は無料ですか？', a: 'はい、完全に無料です。手ぶらでお越しいただけます。未経験者にテーブルゲームの魅力を伝えたいという目的の元、会場設営費用等はすべて主催者側で負担しています。募金・協賛等は大歓迎です！' },
          { q: 'そもそもゲーム自体が未経験者です。それでも参加できますか？', a: 'もちろんです！初心者・未経験者大歓迎です。スタッフが丁寧にルールを説明しますので、安心してご参加ください。' },
          { q: '事前申し込みは必要ですか？', a: '事前申し込みは必須ではありませんが、あらかじめ予約しておくとご案内をスムーズに行えます。ぜひ<a href="#reservation"> こちらの参加予約フォーム </a>よりお申し込みください！' },
          { q: '年齢制限はありますか？', a: '年齢制限はありません。幅広い年代の方が参加されています。どなたでも歓迎いたします。\nただし小学生２年生以下のお子様とご参加の場合は必ず保護者と一緒に参加願います。スタッフに育児を丸投げするような行為は固くお断りしております。' },
          { q: '途中参加・途中退場は可能ですか？', a: 'はい、可能です。開催時間内であれば、いつでも参加・退場いただけます。お気軽にお越しください。' },
          { q: '駐車場はありますか？', a: 'みんなの実家 門脇家、秋田ベイパラダイスには無料駐車場がございます。秋田市文化創造館、横手市交流センター/Y2ぷらざでは近隣の有料駐車場をご利用願います。その他の会場も基本的には近隣の有料駐車場をご利用願います。' }
        ]
      },
      schedule: {
        title: '次回開催予定',
        eventName: 'テーブルゲーム交流会：Ke.',
        loading: '次回イベント情報を読み込み中...',
        cta: 'このイベントに参加する',
        moreInfo: 'その他の予定については',
        here: 'こちら',
        moreInfo2: 'をご確認ください。',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['日', '月', '火', '水', '木', '金', '土'],
        eventCountPrefix: '第',
        eventCountSuffix: '回'
      },
      contact: {
        title: 'お問い合わせ',
        name: 'お名前',
        email: 'メールアドレス',
        message: 'お問い合わせ内容',
        namePlaceholder: 'やまだ たろう',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: 'ご質問やご相談をお気軽にお聞かせください',
        submit: '送信',
        sending: '送信中...'
      },
      sns: {
        title: '最新情報を<span class="mobile-br"><br /></span>SNSでチェック！',
        subtitle: 'イベントの最新情報や参加者の様子を<span class="mobile-br"><br /></span>お届けしています'
      },
      backToTop: 'トップへ戻る'
    },
    en: {
      nav: {
        about: 'About Event',
        schedule: 'Schedule',
        access: 'Access',
        contact: 'Contact'
      },
      hero: {
        title1: 'Play with board games',
        title2: 'from around the world!',
        badge1: 'Free participation',
        badge2: 'Beginners welcome',
        badge3: 'All ages and genders!',
        aboutTitle: 'About Tabletop Game Social: Ke.',
        description1: 'Tabletop Game Social: Ke. is a social event where people can play regardless of age, generation, or position.',
        description2: '"The rules seem difficult..." "Can I keep up?" No need to worry! Experienced staff will teach you from the basics, so even beginners can enjoy with confidence. Perfect for making new friends or finding new hobbies for people over 50! Participants range from 3 to 90 years old.',
        description3: 'Why not get away from your smartphone, meet face-to-face, and have fun together? Interactions with people of different generations naturally arise through games. We have various types from strategic games that use your brain to party games that everyone can laugh at.',
        description4: "It's okay to start with just observing! Why not spend a heartwarming time of interaction together at Akita's new community space?",
        btn1: 'Join the next event',
        btn2: 'Get latest info on SNS'
      },
      sponsors: {
        cooperation: 'Cooperation',
        support: 'Support'
      },
      gallery: {
        title: 'Event Photos',
        captions: [
          'Everyone from children to seniors can enjoy regardless of age!',
          'YOLUBE activities are invited to events other than "Ke".',
          'YOLUBE activities are invited to events other than "Ke".',
          'Classic "Ticket to Ride"',
          'You can also play "Radar Strategy Game" that landed in Japan in the 1960s',
          'Unlimited ways to play! You can arrange and enjoy games in your own way. This is also the charm of tabletop games.'
        ]
      },
      problem: {
        title: 'Do you have these concerns?',
        items: [
          { title: 'Want to make new friends', desc: "I want to make new friends in Akita, but there aren't many places to meet..." },
          { title: 'Interested in tabletop games', desc: "I want to try tabletop games, but I don't know the rules and have no one to play with..." },
          { title: 'Weekend routine is monotonous', desc: 'Always the same routine, want to find new hobbies and enjoyment...' }
        ]
      },
      solution: {
        title: 'Perfect for you!',
        lead: 'Tabletop games are about enjoying communication. Not through screens but <strong>"real connections with people"</strong>.<br />A place where you can see various unexpected sides of people, such as facial expressions, tone of voice, atmosphere, and unexpected events.<br />Strangers become friendly within minutes - this is the mysterious charm of tabletop games.',
        features: [
          { title: 'Rich experience using five senses', desc: 'The tactile sensation of moving pieces by hand, everyone\'s laughter, and a series of actions you wouldn\'t normally think of. You can enjoy the atmosphere with your whole body.' },
          { title: 'Natural encounters and friendships', desc: 'Conversations naturally arise through games, creating new connections beyond social positions. Let\'s play naturally, away from the hustle and bustle of daily life.' },
          { title: 'Safe support for beginners', desc: 'Game selection is very important! Staff will suggest the best games based on participants\' experience and preferences!' }
        ]
      },
      flow: {
        title: 'Event Flow',
        steps: [
          { number: 'STEP 1', title: 'Reception & Arrival', desc: 'First, register at the reception! Then create a "name tag with your nickname" to call each other during games!' },
          { number: 'STEP 2', title: 'Game Selection', desc: 'Over 150 types of games + participant-brought games! If it\'s your first time, please talk to staff! We\'ll suggest recommended games based on your age and experience! We also support adjusting the number of players for games!' },
          { number: 'STEP 3', title: 'Learn Rules & Play', desc: 'Learn the rules by reading the manual or watching rule explanation videos from the QR code on the bottom right of the box! If you\'re worried, please talk to staff! Staff will explain rules to beginners. Then just play! You might find hours have passed... lol' },
          { number: 'STEP 4', title: 'Clean Up & Leave', desc: 'Clean up games after playing! If you don\'t know how to clean up, please ask nearby staff!<br />To allow many participants to play, please cooperate by playing one game at a time!<br />Entry and exit are free. Please return your name tag to reception when leaving.' }
        ]
      },
      testimonials: {
        title: 'Participant Voices',
        items: [
          { age: 'Man in 60s', text: "I didn't know Akita had such an event! I thought it was only Go and Shogi, but I was surprised by so many games." },
          { age: 'Man in 40s', text: "I'm a transferee, but I made friends here. I'll come play again!" },
          { age: 'Woman in 30s', text: 'Even parent and child beginners could enjoy!' },
          { age: 'Boy in teens', text: 'Everything was fun!' },
          { age: 'Woman in 40s', text: 'I was hoping there would be a place for children to play with board games, so it was really fun.' },
          { age: 'Woman in 20s', text: 'It was good that it was moderately difficult and simple to play. I liked that I could communicate with people in a fun way.' }
        ]
      },
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Is participation really free?', a: 'Yes, completely free. You can come empty-handed. With the purpose of conveying the charm of tabletop games to inexperienced people, all venue setup costs are borne by the organizers. Donations and sponsorships are very welcome!' },
          { q: "I'm inexperienced with games themselves. Can I still participate?", a: 'Of course! Beginners and inexperienced people are very welcome. Staff will carefully explain the rules, so please participate with confidence.' },
          { q: 'Is advance registration required?', a: 'Advance registration is not required, but making a reservation in advance allows us to guide you smoothly. Please apply from <a href="#reservation">this participation reservation form</a>!' },
          { q: 'Is there an age limit?', a: 'There is no age limit. People of a wide range of ages participate. Everyone is welcome.\nHowever, if participating with children in 2nd grade or below, parents must accompany them. We firmly decline behavior such as leaving childcare entirely to staff.' },
          { q: 'Can I join midway or leave early?', a: 'Yes, you can. You can participate or leave at any time during the event hours. Feel free to come.' },
          { q: 'Is there parking?', a: "Minna no Jikka Kadowaki-ke and Akita Bay Paradise have free parking. Please use nearby paid parking for Akita City Cultural Creation Center and Yokote City Exchange Center/Y2 Plaza. Other venues also basically require using nearby paid parking." }
        ]
      },
      schedule: {
        title: 'Next Event',
        eventName: 'Tabletop Game Social: Ke.',
        loading: 'Loading next event information...',
        cta: 'Join this event',
        moreInfo: 'For other schedules, please check',
        here: 'here',
        moreInfo2: '.',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        eventCountPrefix: '#',
        eventCountSuffix: ''
      },
      contact: {
        title: 'Contact',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Taro Yamada',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: 'Feel free to share your questions or concerns',
        submit: 'Send',
        sending: 'Sending...'
      },
      sns: {
        title: 'Check latest info on SNS!',
        subtitle: 'We deliver the latest event information and participant updates'
      },
      backToTop: 'Back to Top'
    },
    vi: {
      nav: {
        about: 'Về Sự Kiện',
        schedule: 'Lịch Trình',
        access: 'Đường Đi',
        contact: 'Liên Hệ'
      },
      hero: {
        title1: 'Chơi board game',
        title2: 'từ khắp thế giới!',
        badge1: 'Tham gia miễn phí',
        badge2: 'Chào đón người mới',
        badge3: 'Mọi lứa tuổi và giới tính!',
        aboutTitle: 'Về Câu Lạc Bộ Board Game Giao Lưu: Ke.',
        description1: 'Câu Lạc Bộ Board Game Giao Lưu: Ke. là sự kiện giao lưu mà mọi người có thể chơi bất kể tuổi tác, thế hệ hay vị trí.',
        description2: '"Luật chơi có vẻ khó..." "Liệu mình có theo kịp không?" Đừng lo lắng! Đội ngũ có kinh nghiệm sẽ hướng dẫn từ cơ bản, vì vậy ngay cả người mới bắt đầu cũng có thể tận hưởng một cách tự tin. Hoàn hảo để kết bạn mới hoặc tìm sở thích mới cho những người trên 50 tuổi! Người tham gia từ 3 đến 90 tuổi.',
        description3: 'Tại sao không rời xa điện thoại thông minh, gặp mặt trực tiếp và vui vẻ cùng nhau? Sự tương tác với những người thuộc các thế hệ khác nhau tự nhiên phát sinh thông qua trò chơi. Chúng tôi có nhiều loại từ trò chơi chiến lược sử dụng trí não đến trò chơi tiệc tùng mà mọi người có thể cười.',
        description4: 'Bắt đầu bằng việc quan sát cũng được! Tại sao không dành thời gian tương tác ấm áp cùng nhau tại không gian cộng đồng mới của Akita?',
        btn1: 'Tham gia sự kiện tiếp theo',
        btn2: 'Nhận thông tin mới nhất trên SNS'
      },
      sponsors: {
        cooperation: 'Hợp Tác',
        support: 'Hỗ Trợ'
      },
      gallery: {
        title: 'Hình Ảnh Sự Kiện',
        captions: [
          'Từ trẻ em đến người cao tuổi đều có thể vui chơi bất kể độ tuổi!',
          'Hoạt động của YOLUBE được mời đến các sự kiện khác ngoài "Ke".',
          'Hoạt động của YOLUBE được mời đến các sự kiện khác ngoài "Ke".',
          'Trò chơi kinh điển "Ticket to Ride"',
          'Bạn cũng có thể chơi "Trò chơi Chiến Lược Radar" đến Nhật Bản vào những năm 1960',
          'Cách chơi vô hạn! Bạn có thể sáng tạo và thưởng thức trò chơi theo cách riêng. Đây cũng là sức hấp dẫn của board game.'
        ]
      },
      problem: {
        title: 'Bạn có những lo lắng này không?',
        items: [
          { title: 'Muốn kết bạn mới', desc: 'Tôi muốn kết bạn mới ở Akita, nhưng không có nhiều nơi để gặp gỡ...' },
          { title: 'Quan tâm đến board game', desc: 'Tôi muốn thử board game, nhưng không biết luật chơi và không có ai chơi cùng...' },
          { title: 'Cuối tuần đơn điệu', desc: 'Luôn luôn lặp lại, muốn tìm sở thích và niềm vui mới...' }
        ]
      },
      solution: {
        title: 'Hoàn hảo cho bạn!',
        lead: 'Board game là về việc tận hưởng giao tiếp. Không phải qua màn hình mà là <strong>"kết nối thực sự với mọi người"</strong>.<br />Một nơi bạn có thể thấy nhiều khía cạnh bất ngờ của mọi người, như biểu cảm khuôn mặt, giọng nói, không khí và sự kiện bất ngờ.<br />Người lạ trở nên thân thiết trong vài phút - đây là sức hấp dẫn kỳ diệu của board game.',
        features: [
          { title: 'Trải nghiệm phong phú dùng năm giác quan', desc: 'Cảm giác xúc giác khi di chuyển quân cờ bằng tay, tiếng cười của mọi người và một loạt hành động bạn thường không nghĩ đến. Bạn có thể tận hưởng bầu không khí bằng toàn bộ cơ thể.' },
          { title: 'Gặp gỡ tự nhiên và tạo bạn bè', desc: 'Cuộc trò chuyện tự nhiên phát sinh thông qua trò chơi, tạo ra kết nối mới vượt qua vị trí xã hội. Hãy chơi tự nhiên, xa rời sự ồn ào của cuộc sống hàng ngày.' },
          { title: 'Hỗ trợ an toàn cho người mới', desc: 'Lựa chọn trò chơi rất quan trọng! Nhân viên sẽ đề xuất trò chơi tốt nhất dựa trên kinh nghiệm và sở thích của người tham gia!' }
        ]
      },
      flow: {
        title: 'Quy Trình Sự Kiện',
        steps: [
          { number: 'BƯỚC 1', title: 'Đón Tiếp & Đến Nơi', desc: 'Đầu tiên, đăng ký tại quầy tiếp tân! Sau đó tạo "thẻ tên với biệt danh" để gọi nhau trong trò chơi!' },
          { number: 'BƯỚC 2', title: 'Chọn Trò Chơi', desc: 'Hơn 150 loại trò chơi + trò chơi do người tham gia mang đến! Nếu là lần đầu, hãy nói chuyện với nhân viên! Chúng tôi sẽ đề xuất trò chơi được khuyến nghị dựa trên độ tuổi và kinh nghiệm của bạn! Chúng tôi cũng hỗ trợ điều chỉnh số người chơi!' },
          { number: 'BƯỚC 3', title: 'Học Luật & Chơi', desc: 'Học luật bằng cách đọc hướng dẫn hoặc xem video giải thích luật từ mã QR ở góc dưới bên phải của hộp! Nếu lo lắng, hãy nói chuyện với nhân viên! Nhân viên sẽ giải thích luật cho người mới. Sau đó chỉ cần chơi! Bạn có thể thấy hàng giờ đã trôi qua... lol' },
          { number: 'BƯỚC 4', title: 'Dọn Dẹp & Ra Về', desc: 'Dọn dẹp trò chơi sau khi chơi! Nếu không biết cách dọn dẹp, hãy hỏi nhân viên gần đó!<br />Để cho phép nhiều người tham gia chơi, vui lòng hợp tác bằng cách chơi một trò chơi tại một thời điểm!<br />Ra vào tự do. Vui lòng trả thẻ tên cho quầy tiếp tân khi rời đi.' }
        ]
      },
      testimonials: {
        title: 'Ý Kiến Người Tham Gia',
        items: [
          { age: 'Nam 60 tuổi', text: 'Tôi không biết Akita có sự kiện như vậy! Tôi nghĩ chỉ có Cờ vây và Shogi, nhưng tôi đã ngạc nhiên với rất nhiều trò chơi.' },
          { age: 'Nam 40 tuổi', text: 'Tôi là người chuyển công tác, nhưng tôi đã kết bạn ở đây. Tôi sẽ đến chơi lại!' },
          { age: 'Nữ 30 tuổi', text: 'Ngay cả cha mẹ và con cái mới bắt đầu cũng có thể thưởng thức!' },
          { age: 'Nam thiếu niên', text: 'Mọi thứ đều vui!' },
          { age: 'Nữ 40 tuổi', text: 'Tôi đã hy vọng sẽ có nơi cho trẻ em chơi board game, nên thật sự rất vui.' },
          { age: 'Nữ 20 tuổi', text: 'Tốt là vừa phải khó và đơn giản để chơi. Tôi thích có thể giao tiếp với mọi người một cách vui vẻ.' }
        ]
      },
      faq: {
        title: 'Câu Hỏi Thường Gặp',
        items: [
          { q: 'Tham gia thực sự miễn phí?', a: 'Vâng, hoàn toàn miễn phí. Bạn có thể đến mà không cần mang gì. Với mục đích truyền đạt sức hấp dẫn của board game cho người chưa có kinh nghiệm, tất cả chi phí thiết lập địa điểm được ban tổ chức chịu. Quyên góp và tài trợ rất được hoan nghênh!' },
          { q: 'Tôi chưa có kinh nghiệm với trò chơi. Tôi vẫn có thể tham gia?', a: 'Tất nhiên! Người mới bắt đầu và chưa có kinh nghiệm rất được hoan nghênh. Nhân viên sẽ cẩn thận giải thích luật, vì vậy hãy tham gia với sự tự tin.' },
          { q: 'Đăng ký trước có bắt buộc không?', a: 'Đăng ký trước không bắt buộc, nhưng đặt chỗ trước cho phép chúng tôi hướng dẫn bạn một cách suôn sẻ. Vui lòng đăng ký từ <a href="#reservation">mẫu đăng ký tham gia này</a>!' },
          { q: 'Có giới hạn độ tuổi không?', a: 'Không có giới hạn độ tuổi. Mọi người ở nhiều độ tuổi tham gia. Mọi người đều được chào đón.\nTuy nhiên, nếu tham gia với trẻ em lớp 2 trở xuống, phụ huynh phải đi cùng. Chúng tôi kiên quyết từ chối hành vi như giao phó chăm sóc trẻ hoàn toàn cho nhân viên.' },
          { q: 'Có thể tham gia giữa chừng hoặc rời đi sớm?', a: 'Vâng, bạn có thể. Bạn có thể tham gia hoặc rời đi bất cứ lúc nào trong giờ sự kiện. Hãy thoải mái đến.' },
          { q: 'Có chỗ đậu xe không?', a: 'Minna no Jikka Kadowaki-ke và Akita Bay Paradise có bãi đậu xe miễn phí. Vui lòng sử dụng bãi đậu xe trả phí gần đó cho Trung tâm Sáng tạo Văn hóa Thành phố Akita và Trung tâm Giao lưu Thành phố Yokote/Y2 Plaza. Các địa điểm khác cũng cơ bản yêu cầu sử dụng bãi đậu xe trả phí gần đó.' }
        ]
      },
      schedule: {
        title: 'Sự Kiện Tiếp Theo',
        eventName: 'Câu Lạc Bộ Board Game Giao Lưu: Ke.',
        loading: 'Đang tải thông tin sự kiện tiếp theo...',
        cta: 'Tham gia sự kiện này',
        moreInfo: 'Để biết lịch trình khác, vui lòng kiểm tra',
        here: 'tại đây',
        moreInfo2: '.',
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        weekdays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        eventCountPrefix: 'Lần thứ ',
        eventCountSuffix: ''
      },
      contact: {
        title: 'Liên Hệ',
        name: 'Tên',
        email: 'Email',
        message: 'Tin Nhắn',
        namePlaceholder: 'Taro Yamada',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: 'Hãy thoải mái chia sẻ câu hỏi hoặc mối quan tâm của bạn',
        submit: 'Gửi',
        sending: 'Đang gửi...'
      },
      sns: {
        title: 'Kiểm tra thông tin mới nhất trên SNS!',
        subtitle: 'Chúng tôi cung cấp thông tin sự kiện mới nhất và cập nhật người tham gia'
      },
      backToTop: 'Về Đầu Trang'
    },
    de: {
      nav: {
        about: 'Über die Veranstaltung',
        schedule: 'Zeitplan',
        access: 'Anfahrt',
        contact: 'Kontakt'
      },
      hero: {
        title1: 'Spiele Brettspiele',
        title2: 'aus der ganzen Welt!',
        badge1: 'Kostenlose Teilnahme',
        badge2: 'Anfänger willkommen',
        badge3: 'Alle Altersgruppen!',
        aboutTitle: 'Über Brettspiel-Treff: Ke.',
        description1: 'Brettspiel-Treff: Ke. ist eine soziale Veranstaltung, bei der Menschen unabhängig von Alter, Generation oder Position spielen können.',
        description2: '"Die Regeln scheinen schwierig..." "Kann ich mithalten?" Keine Sorge! Erfahrene Mitarbeiter bringen Ihnen alles von Grund auf bei, sodass auch Anfänger selbstbewusst mitspielen können. Perfekt zum Kennenlernen neuer Freunde oder zur Entdeckung neuer Hobbys für Menschen über 50! Teilnehmer sind zwischen 3 und 90 Jahre alt.',
        description3: 'Warum nicht vom Smartphone weggehen, sich persönlich treffen und gemeinsam Spaß haben? Interaktionen mit Menschen verschiedener Generationen entstehen auf natürliche Weise durch Spiele. Wir haben verschiedene Arten von strategischen Spielen, die Ihr Gehirn fordern, bis hin zu Partyspielen, bei denen alle lachen können.',
        description4: 'Es ist in Ordnung, nur mit Beobachten zu beginnen! Warum nicht gemeinsam eine herzerwärmende Zeit der Interaktion in Akitas neuem Gemeinschaftsraum verbringen?',
        btn1: 'An der nächsten Veranstaltung teilnehmen',
        btn2: 'Neueste Infos in sozialen Medien'
      },
      sponsors: {
        cooperation: 'Zusammenarbeit',
        support: 'Unterstützung'
      },
      gallery: {
        title: 'Veranstaltungsfotos',
        captions: [
          'Jeder, von Kindern bis zu Senioren, kann unabhängig vom Alter Spaß haben!',
          'YOLUBE-Aktivitäten werden zu anderen Veranstaltungen als "Ke" eingeladen.',
          'YOLUBE-Aktivitäten werden zu anderen Veranstaltungen als "Ke" eingeladen.',
          'Klassiker "Zug um Zug"',
          'Sie können auch das "Radar-Strategiespiel" spielen, das in den 1960er Jahren nach Japan kam',
          'Unbegrenzte Spielmöglichkeiten! Sie können Spiele auf Ihre eigene Weise arrangieren und genießen. Das ist auch der Charme von Brettspielen.'
        ]
      },
      problem: {
        title: 'Haben Sie diese Sorgen?',
        items: [
          { title: 'Neue Freunde finden', desc: 'Ich möchte in Akita neue Freunde finden, aber es gibt nicht viele Orte zum Treffen...' },
          { title: 'Interesse an Brettspielen', desc: 'Ich möchte Brettspiele ausprobieren, aber ich kenne die Regeln nicht und habe niemanden zum Spielen...' },
          { title: 'Wochenend-Routine ist eintönig', desc: 'Immer die gleiche Routine, ich möchte neue Hobbys und Vergnügen finden...' }
        ]
      },
      solution: {
        title: 'Perfekt für Sie!',
        lead: 'Bei Brettspielen geht es darum, Kommunikation zu genießen. Nicht durch Bildschirme, sondern <strong>"echte Verbindungen mit Menschen"</strong>.<br />Ein Ort, an dem Sie viele unerwartete Seiten von Menschen sehen können, wie Gesichtsausdrücke, Tonfall, Atmosphäre und unerwartete Ereignisse.<br />Fremde werden innerhalb von Minuten freundlich - das ist der geheimnisvolle Charme von Brettspielen.',
        features: [
          { title: 'Reiche Erfahrung mit allen Sinnen', desc: 'Die taktile Empfindung, Spielsteine von Hand zu bewegen, das Lachen aller und eine Reihe von Handlungen, an die Sie normalerweise nicht denken würden. Sie können die Atmosphäre mit Ihrem ganzen Körper genießen.' },
          { title: 'Natürliche Begegnungen und Freundschaften', desc: 'Gespräche entstehen auf natürliche Weise durch Spiele und schaffen neue Verbindungen über soziale Positionen hinweg. Lassen Sie uns auf natürliche Weise spielen, fernab vom Trubel des Alltags.' },
          { title: 'Sichere Unterstützung für Anfänger', desc: 'Die Spielauswahl ist sehr wichtig! Die Mitarbeiter schlagen die besten Spiele basierend auf den Erfahrungen und Vorlieben der Teilnehmer vor!' }
        ]
      },
      flow: {
        title: 'Veranstaltungsablauf',
        steps: [
          { number: 'SCHRITT 1', title: 'Empfang & Ankunft', desc: 'Melden Sie sich zunächst am Empfang an! Erstellen Sie dann ein "Namensschild mit Ihrem Spitznamen", um sich während der Spiele zu rufen!' },
          { number: 'SCHRITT 2', title: 'Spielauswahl', desc: 'Über 150 Spielearten + von Teilnehmern mitgebrachte Spiele! Wenn Sie zum ersten Mal dabei sind, sprechen Sie bitte mit den Mitarbeitern! Wir schlagen empfohlene Spiele basierend auf Ihrem Alter und Ihrer Erfahrung vor! Wir unterstützen auch die Anpassung der Spieleranzahl!' },
          { number: 'SCHRITT 3', title: 'Regeln lernen & Spielen', desc: 'Lernen Sie die Regeln, indem Sie das Handbuch lesen oder Regelerklärungsvideos vom QR-Code unten rechts auf der Box ansehen! Wenn Sie besorgt sind, sprechen Sie bitte mit den Mitarbeitern! Die Mitarbeiter erklären Anfängern die Regeln. Dann einfach spielen! Sie werden vielleicht feststellen, dass Stunden vergangen sind... lol' },
          { number: 'SCHRITT 4', title: 'Aufräumen & Gehen', desc: 'Räumen Sie Spiele nach dem Spielen auf! Wenn Sie nicht wissen, wie man aufräumt, fragen Sie bitte die Mitarbeiter in der Nähe!<br />Um vielen Teilnehmern das Spielen zu ermöglichen, spielen Sie bitte jeweils ein Spiel!<br />Ein- und Ausgang sind frei. Bitte geben Sie Ihr Namensschild beim Verlassen am Empfang ab.' }
        ]
      },
      testimonials: {
        title: 'Teilnehmerstimmen',
        items: [
          { age: 'Mann in den 60ern', text: 'Ich wusste nicht, dass Akita eine solche Veranstaltung hat! Ich dachte, es gäbe nur Go und Shogi, aber ich war überrascht über so viele Spiele.' },
          { age: 'Mann in den 40ern', text: 'Ich bin versetzt worden, aber ich habe hier Freunde gefunden. Ich werde wiederkommen!' },
          { age: 'Frau in den 30ern', text: 'Sogar Eltern und Kind als Anfänger konnten es genießen!' },
          { age: 'Junge im Teenageralter', text: 'Alles hat Spaß gemacht!' },
          { age: 'Frau in den 40ern', text: 'Ich hatte gehofft, dass es einen Ort für Kinder geben würde, um mit Brettspielen zu spielen, also hat es wirklich Spaß gemacht.' },
          { age: 'Frau in den 20ern', text: 'Es war gut, dass es mäßig schwierig und einfach zu spielen war. Mir hat gefallen, dass ich auf unterhaltsame Weise mit Menschen kommunizieren konnte.' }
        ]
      },
      faq: {
        title: 'Häufig gestellte Fragen',
        items: [
          { q: 'Ist die Teilnahme wirklich kostenlos?', a: 'Ja, völlig kostenlos. Sie können mit leeren Händen kommen. Mit dem Ziel, unerfahrenen Menschen den Charme von Brettspielen zu vermitteln, werden alle Kosten für die Veranstaltungseinrichtung von den Organisatoren getragen. Spenden und Sponsoring sind sehr willkommen!' },
          { q: 'Ich habe keine Erfahrung mit Spielen selbst. Kann ich trotzdem teilnehmen?', a: 'Natürlich! Anfänger und unerfahrene Personen sind sehr willkommen. Die Mitarbeiter erklären die Regeln sorgfältig, also nehmen Sie bitte selbstbewusst teil.' },
          { q: 'Ist eine Voranmeldung erforderlich?', a: 'Eine Voranmeldung ist nicht erforderlich, aber eine Reservierung im Voraus ermöglicht es uns, Sie reibungslos zu führen. Bitte melden Sie sich über <a href="#reservation">dieses Teilnahme-Anmeldeformular</a> an!' },
          { q: 'Gibt es eine Altersgrenze?', a: 'Es gibt keine Altersgrenze. Menschen unterschiedlichen Alters nehmen teil. Jeder ist willkommen.\nWenn Sie jedoch mit Kindern der 2. Klasse oder darunter teilnehmen, müssen Eltern sie begleiten. Wir lehnen Verhaltensweisen wie die vollständige Überlassung der Kinderbetreuung an das Personal strikt ab.' },
          { q: 'Kann ich mittendrin beitreten oder früher gehen?', a: 'Ja, Sie können. Sie können jederzeit während der Veranstaltungszeiten teilnehmen oder gehen. Kommen Sie gerne vorbei.' },
          { q: 'Gibt es Parkplätze?', a: 'Minna no Jikka Kadowaki-ke und Akita Bay Paradise haben kostenlose Parkplätze. Bitte nutzen Sie die nahegelegenen kostenpflichtigen Parkplätze für das Akita City Cultural Creation Center und das Yokote City Exchange Center/Y2 Plaza. Andere Veranstaltungsorte erfordern grundsätzlich auch die Nutzung nahegelegener kostenpflichtiger Parkplätze.' }
        ]
      },
      schedule: {
        title: 'Nächste Veranstaltung',
        eventName: 'Brettspiel-Treff: Ke.',
        loading: 'Nächste Veranstaltungsinformationen werden geladen...',
        cta: 'An dieser Veranstaltung teilnehmen',
        moreInfo: 'Für andere Termine bitte',
        here: 'hier',
        moreInfo2: 'prüfen.',
        months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        eventCountPrefix: '#',
        eventCountSuffix: ''
      },
      contact: {
        title: 'Kontakt',
        name: 'Name',
        email: 'E-Mail',
        message: 'Nachricht',
        namePlaceholder: 'Max Mustermann',
        emailPlaceholder: 'beispiel@email.com',
        messagePlaceholder: 'Teilen Sie uns gerne Ihre Fragen oder Anliegen mit',
        submit: 'Senden',
        sending: 'Wird gesendet...'
      },
      sns: {
        title: 'Neueste Infos in sozialen Medien!',
        subtitle: 'Wir liefern die neuesten Veranstaltungsinformationen und Teilnehmer-Updates'
      },
      backToTop: 'Zurück nach oben'
    },
    ko: {
      nav: {
        about: '이벤트 소개',
        schedule: '일정',
        access: '오시는 길',
        contact: '문의'
      },
      hero: {
        title1: '전 세계의',
        title2: '보드게임을 즐기세요!',
        badge1: '무료 참가',
        badge2: '초보자 환영',
        badge3: '모든 연령 환영!',
        aboutTitle: '보드게임 교류회: Ke. 소개',
        description1: '보드게임 교류회: Ke.는 나이, 세대, 위치에 관계없이 모두가 즐길 수 있는 교류 행사입니다.',
        description2: '"규칙이 어려워 보여요..." "제가 따라갈 수 있을까요?" 걱정하지 마세요! 경험 많은 스태프가 기초부터 친절하게 가르쳐드리므로 초보자도 자신 있게 즐길 수 있습니다. 새로운 친구를 사귀거나 50세 이상의 분들이 새로운 취미를 찾기에 완벽합니다! 3세부터 90세까지 다양한 연령대의 참가자가 있습니다.',
        description3: '스마트폰에서 벗어나 직접 만나서 함께 즐겨보는 건 어떨까요? 다양한 세대의 사람들과의 교류가 게임을 통해 자연스럽게 생겨납니다. 두뇌를 사용하는 전략 게임부터 모두가 함께 웃을 수 있는 파티 게임까지 다양한 종류를 준비했습니다.',
        description4: '구경부터 시작해도 괜찮아요! 아키타의 새로운 커뮤니티 공간에서 따뜻한 교류의 시간을 함께 보내지 않으시겠어요?',
        btn1: '다음 이벤트에 참가하기',
        btn2: 'SNS에서 최신 정보 받기'
      },
      sponsors: {
        cooperation: '협력',
        support: '후원'
      },
      gallery: {
        title: '이벤트 사진',
        captions: [
          '어린이부터 노인까지 나이에 관계없이 모두가 즐길 수 있습니다!',
          'YOLUBE 활동은 "Ke" 외의 이벤트에도 초대받고 있습니다.',
          'YOLUBE 활동은 "Ke" 외의 이벤트에도 초대받고 있습니다.',
          '명작 "티켓 투 라이드"',
          '1960년대에 일본에 상륙한 "레이더 작전 게임"도 즐길 수 있습니다',
          '무한한 플레이 방법! 자신만의 방식으로 게임을 편곡하고 즐길 수 있습니다. 이것도 보드게임의 매력입니다.'
        ]
      },
      problem: {
        title: '이런 고민 있으신가요?',
        items: [
          { title: '새로운 친구를 사귀고 싶어요', desc: '아키타에서 새로운 친구를 사귀고 싶지만 만날 곳이 많지 않아요...' },
          { title: '보드게임에 관심이 있어요', desc: '보드게임을 해보고 싶지만 규칙을 모르고 함께 할 사람도 없어요...' },
          { title: '주말이 단조로워요', desc: '항상 똑같은 일상의 반복, 새로운 취미와 즐거움을 찾고 싶어요...' }
        ]
      },
      solution: {
        title: '당신에게 완벽합니다!',
        lead: '보드게임은 소통을 즐기는 게임입니다. 화면이 아닌 <strong>"실제 사람들과의 연결"</strong>을 즐길 수 있습니다.<br />표정, 목소리 톤, 분위기, 예상치 못한 사건 등 사람들의 다양한 의외의 면을 볼 수 있는 곳입니다.<br />낯선 사람들이 몇 분 안에 친해지는 것 - 이것이 보드게임의 신비로운 매력입니다.',
        features: [
          { title: '오감을 사용한 풍부한 경험', desc: '손으로 말을 움직이는 촉감, 모두의 웃음소리, 평소에는 생각하지 못한 행동의 연속. 온몸으로 분위기를 즐길 수 있습니다.' },
          { title: '자연스러운 만남과 친구 만들기', desc: '게임을 통해 자연스럽게 대화가 생기고 사회적 지위를 넘어 새로운 연결이 만들어집니다. 일상의 번잡함에서 벗어나 자연스럽게 즐겨봅시다.' },
          { title: '초보자를 위한 안전한 지원', desc: '게임 선택이 매우 중요합니다! 스태프가 참가자의 경험과 선호도를 바탕으로 최고의 게임을 제안합니다!' }
        ]
      },
      flow: {
        title: '이벤트 진행',
        steps: [
          { number: '1단계', title: '접수 및 도착', desc: '먼저 접수처에서 참가 등록을 하세요! 그런 다음 게임 중에 서로 부를 "별명이 적힌 명찰"을 만드세요!' },
          { number: '2단계', title: '게임 선택', desc: '150종 이상의 게임 + 참가자가 가져온 게임! 처음이시라면 스태프에게 말씀해주세요! 나이와 경험을 바탕으로 추천 게임을 제안해드립니다! 게임 인원 조정도 지원합니다!' },
          { number: '3단계', title: '규칙 학습 및 플레이', desc: '설명서를 읽거나 상자 오른쪽 하단의 QR 코드에서 규칙 설명 영상을 시청하여 규칙을 배우세요! 걱정되시면 스태프에게 말씀해주세요! 스태프가 초보자에게 규칙을 설명해드립니다. 그런 다음 그냥 플레이하세요! 몇 시간이 지나간 것을 알게 될 수도 있습니다... ㅋㅋ' },
          { number: '4단계', title: '정리 및 퇴장', desc: '게임 후에는 정리하세요! 정리 방법을 모르시면 근처 스태프에게 문의하세요!<br />많은 참가자가 즐길 수 있도록 한 번에 하나의 게임만 플레이해주시기 바랍니다!<br />입퇴장은 자유입니다. 떠나실 때는 명찰을 접수처에 반납해주세요.' }
        ]
      },
      testimonials: {
        title: '참가자 후기',
        items: [
          { age: '60대 남성', text: '아키타에 이런 이벤트가 있는지 몰랐어요! Go와 쇼기만 있는 줄 알았는데 정말 많은 게임에 놀랐습니다.' },
          { age: '40대 남성', text: '저는 전근족이지만 여기서 친구를 사귀었어요. 다시 놀러 올게요!' },
          { age: '30대 여성', text: '게임 초보자인 부모와 자녀도 즐길 수 있었어요!' },
          { age: '10대 남성', text: '모든 게 재미있었어요!' },
          { age: '40대 여성', text: '아이들이 보드게임을 가지고 놀 수 있는 곳이 있으면 좋겠다고 생각했는데 정말 즐거웠어요.' },
          { age: '20대 여성', text: '적당히 어렵고 간단하게 즐길 수 있어서 좋았어요. 사람들과 즐겁게 소통할 수 있어서 좋았습니다.' }
        ]
      },
      faq: {
        title: '자주 묻는 질문',
        items: [
          { q: '참가비가 정말 무료인가요?', a: '네, 완전히 무료입니다. 빈손으로 오셔도 됩니다. 경험이 없는 사람들에게 보드게임의 매력을 전달하려는 목적으로 모든 장소 설치 비용은 주최자가 부담합니다. 기부와 후원은 매우 환영합니다!' },
          { q: '게임 자체가 처음인데 참가할 수 있나요?', a: '물론입니다! 초보자와 경험이 없는 분들을 환영합니다. 스태프가 규칙을 자세히 설명해드리니 자신 있게 참가하세요.' },
          { q: '사전 등록이 필요한가요?', a: '사전 등록은 필수가 아니지만 미리 예약하시면 원활하게 안내해드릴 수 있습니다. <a href="#reservation">이 참가 예약 양식</a>을 통해 신청해주세요!' },
          { q: '나이 제한이 있나요?', a: '나이 제한은 없습니다. 다양한 연령대의 사람들이 참가합니다. 누구나 환영합니다.\n단, 초등학교 2학년 이하 자녀와 함께 참가하는 경우 반드시 보호자와 함께 참가해야 합니다. 육아를 스태프에게 전적으로 맡기는 행위는 엄격히 금지합니다.' },
          { q: '중간에 참가하거나 일찍 퇴장할 수 있나요?', a: '네, 가능합니다. 행사 시간 내 언제든지 참가하거나 퇴장하실 수 있습니다. 편하게 오세요.' },
          { q: '주차장이 있나요?', a: 'Minna no Jikka Kadowaki-ke와 Akita Bay Paradise에는 무료 주차장이 있습니다. Akita City Cultural Creation Center와 Yokote City Exchange Center/Y2 Plaza는 인근 유료 주차장을 이용해주세요. 다른 장소도 기본적으로 인근 유료 주차장을 이용해야 합니다.' }
        ]
      },
      schedule: {
        title: '다음 이벤트',
        eventName: '보드게임 교류회: Ke.',
        loading: '다음 이벤트 정보를 불러오는 중...',
        cta: '이 이벤트에 참가하기',
        moreInfo: '다른 일정은',
        here: '여기',
        moreInfo2: '에서 확인하세요.',
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        weekdays: ['일', '월', '화', '수', '목', '금', '토'],
        eventCountPrefix: '제',
        eventCountSuffix: '회'
      },
      contact: {
        title: '문의',
        name: '이름',
        email: '이메일',
        message: '메시지',
        namePlaceholder: '홍길동',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: '질문이나 문의사항을 편하게 남겨주세요',
        submit: '보내기',
        sending: '전송 중...'
      },
      sns: {
        title: 'SNS에서 최신 정보 확인!',
        subtitle: '최신 이벤트 정보와 참가자 소식을 전해드립니다'
      },
      backToTop: '맨 위로'
    },
    zh: {
      nav: {
        about: '关于活动',
        schedule: '日程安排',
        access: '交通路线',
        contact: '联系我们'
      },
      hero: {
        title1: '玩遍来自',
        title2: '全世界的桌游！',
        badge1: '免费参加',
        badge2: '欢迎新手',
        badge3: '不限年龄！',
        aboutTitle: '关于桌游交流会：Ke.',
        description1: '桌游交流会：Ke. 是一个无论年龄、世代、立场都能参加的交流活动。',
        description2: '"规则好像很难..." "我能跟得上吗？" 不用担心！经验丰富的工作人员会从基础开始耐心教学，初学者也能放心享受。非常适合结交新朋友或为50岁以上的朋友寻找新爱好！参与者年龄从3岁到90岁不等。',
        description3: '何不暂时离开智能手机，面对面地一起开心玩耍呢？通过游戏，与不同世代的人自然而然地产生交流。从需要动脑的策略游戏到大家一起欢笑的派对游戏，我们准备了各种类型。',
        description4: '从观看开始也可以！要不要在秋田的新社区空间里一起度过温馨的交流时光呢？',
        btn1: '参加下次活动',
        btn2: '在社交媒体上获取最新信息'
      },
      sponsors: {
        cooperation: '合作',
        support: '赞助'
      },
      gallery: {
        title: '活动照片',
        captions: [
          '从儿童到老年人，不分年龄都能享受！',
          'YOLUBE的活动也受邀参加"Ke"以外的活动。',
          'YOLUBE的活动也受邀参加"Ke"以外的活动。',
          '名作《车票之旅》',
          '也可以玩1960年代登陆日本的"雷达作战游戏"',
          '无限的玩法！可以按照自己的方式编排和享受游戏。这也是桌游的魅力。'
        ]
      },
      problem: {
        title: '您有这些烦恼吗？',
        items: [
          { title: '想结交新朋友', desc: '想在秋田结交新朋友，但没有太多见面的地方...' },
          { title: '对桌游感兴趣', desc: '想尝试桌游，但不知道规则，也没有人一起玩...' },
          { title: '周末生活单调', desc: '总是重复同样的事情，想找到新的爱好和乐趣...' }
        ]
      },
      solution: {
        title: '非常适合您！',
        lead: '桌游是享受交流的游戏。不是透过屏幕而是<strong>"与真实的人建立联系"</strong>。<br />一个可以看到人们各种意外一面的地方，如表情、语气、氛围和意外事件。<br />陌生人在几分钟内就变得亲近——这就是桌游的神奇魅力。',
        features: [
          { title: '使用五感的丰富体验', desc: '用手移动棋子的触感、大家的笑声、平时不会想到的一连串行动。可以全身心地享受现场氛围。' },
          { title: '自然的相遇和交友', desc: '通过游戏自然产生对话，创造超越立场的新交流。让我们远离日常喧嚣，自然地玩耍吧。' },
          { title: '新手安心支持', desc: '游戏选择非常重要！工作人员会根据参与者的经验和喜好推荐最佳游戏！' }
        ]
      },
      flow: {
        title: '活动流程',
        steps: [
          { number: '第1步', title: '接待和到达', desc: '首先在接待处进行参加登记！然后制作在游戏中互相称呼用的"写有昵称的名牌"！' },
          { number: '第2步', title: '选择游戏', desc: '150多种游戏 + 参与者自带的游戏！如果是第一次，请向工作人员咨询！我们会根据您的年龄和经验推荐游戏！还会协助调整游戏人数！' },
          { number: '第3步', title: '学习规则和游戏', desc: '通过阅读说明书或观看盒子右下角二维码的规则说明视频来学习规则！如果担心，请向工作人员咨询！工作人员会为新手说明规则。然后尽情游戏吧！可能不知不觉就过了几个小时... 哈哈' },
          { number: '第4步', title: '整理和离开', desc: '游戏结束后请整理！如果不知道如何整理，请向附近的工作人员咨询！<br />为了让更多参与者能够游玩，请配合一次只玩一个游戏！<br />进出自由。离开时请将名牌归还接待处。' }
        ]
      },
      testimonials: {
        title: '参与者心声',
        items: [
          { age: '60多岁男性', text: '没想到秋田有这样的活动！我以为只有围棋和将棋，对这么多游戏感到惊讶。' },
          { age: '40多岁男性', text: '我是调职族，但在这里交到了朋友。我会再来玩的！' },
          { age: '30多岁女性', text: '游戏初学者的亲子也能享受！' },
          { age: '10多岁男性', text: '一切都很有趣！' },
          { age: '40多岁女性', text: '我一直希望有个让孩子用桌游玩耍的地方，所以非常开心。' },
          { age: '20多岁女性', text: '难度适中，玩法简单很好。能和人愉快地交流很好。' }
        ]
      },
      faq: {
        title: '常见问题',
        items: [
          { q: '参加真的免费吗？', a: '是的，完全免费。可以空手来。为了向没有经验的人传达桌游的魅力，所有场地设置费用都由主办方承担。非常欢迎捐款和赞助！' },
          { q: '我完全没玩过游戏。也能参加吗？', a: '当然可以！非常欢迎初学者和没有经验的人。工作人员会仔细说明规则，请放心参加。' },
          { q: '需要提前报名吗？', a: '不需要提前报名，但提前预约可以让我们更顺利地为您提供引导。请通过<a href="#reservation">此参加预约表</a>报名！' },
          { q: '有年龄限制吗？', a: '没有年龄限制。各个年龄段的人都有参加。欢迎所有人。\n但如果带小学二年级及以下的孩子参加，必须有监护人陪同。严禁将育儿完全交给工作人员的行为。' },
          { q: '可以中途参加或提前离开吗？', a: '可以。在活动时间内随时可以参加或离开。请随意前来。' },
          { q: '有停车场吗？', a: 'Minna no Jikka Kadowaki-ke和Akita Bay Paradise有免费停车场。Akita City Cultural Creation Center和Yokote City Exchange Center/Y2 Plaza请使用附近的收费停车场。其他场地基本上也请使用附近的收费停车场。' }
        ]
      },
      schedule: {
        title: '下次活动',
        eventName: '桌游交流会：Ke.',
        loading: '正在加载下次活动信息...',
        cta: '参加此活动',
        moreInfo: '其他日程请查看',
        here: '这里',
        moreInfo2: '。',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['日', '一', '二', '三', '四', '五', '六'],
        eventCountPrefix: '第',
        eventCountSuffix: '次'
      },
      contact: {
        title: '联系我们',
        name: '姓名',
        email: '电子邮箱',
        message: '留言',
        namePlaceholder: '张三',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: '请随时告诉我们您的问题或咨询',
        submit: '发送',
        sending: '发送中...'
      },
      sns: {
        title: '在社交媒体上查看最新信息！',
        subtitle: '我们提供最新的活动信息和参与者动态'
      },
      backToTop: '返回顶部'
    },
    fr: {
      nav: {
        about: 'À propos de l\'événement',
        schedule: 'Horaire',
        access: 'Accès',
        contact: 'Contact'
      },
      hero: {
        title1: 'Jouez à des jeux de société',
        title2: 'du monde entier !',
        badge1: 'Participation gratuite',
        badge2: 'Débutants bienvenus',
        badge3: 'Tous âges et genres !',
        aboutTitle: 'À propos de Rencontre Jeux de Société : Ke.',
        description1: 'Rencontre Jeux de Société : Ke. est un événement social où les gens peuvent jouer sans distinction d\'âge, de génération ou de position.',
        description2: '"Les règles semblent difficiles..." "Vais-je pouvoir suivre ?" Pas d\'inquiétude ! Le personnel expérimenté vous enseignera les bases, même les débutants peuvent profiter en toute confiance. Parfait pour se faire de nouveaux amis ou trouver de nouveaux passe-temps pour les personnes de plus de 50 ans ! Les participants ont entre 3 et 90 ans.',
        description3: 'Pourquoi ne pas vous éloigner de votre smartphone, vous rencontrer en face à face et vous amuser ensemble ? Les interactions avec des personnes de différentes générations naissent naturellement à travers les jeux. Nous avons différents types, des jeux stratégiques qui font travailler le cerveau aux jeux de société où tout le monde peut rire.',
        description4: "Ce n'est pas grave de commencer par observer ! Pourquoi ne pas passer un moment chaleureux d'interaction ensemble dans le nouvel espace communautaire d'Akita ?",
        btn1: 'Rejoindre le prochain événement',
        btn2: 'Infos récentes sur les réseaux'
      },
      sponsors: {
        cooperation: 'Coopération',
        support: 'Soutien'
      },
      gallery: {
        title: 'Photos de l\'événement',
        captions: [
          'Tout le monde, des enfants aux seniors, peut s\'amuser quel que soit l\'âge !',
          'Les activités YOLUBE sont invitées à des événements autres que "Ke".',
          'Les activités YOLUBE sont invitées à des événements autres que "Ke".',
          'Le classique "Les Aventuriers du Rail"',
          'Vous pouvez également jouer au "Jeu de Stratégie Radar" qui est arrivé au Japon dans les années 1960',
          'Façons illimitées de jouer ! Vous pouvez arranger et profiter des jeux à votre manière. C\'est aussi le charme des jeux de société.'
        ]
      },
      problem: {
        title: 'Avez-vous ces préoccupations ?',
        items: [
          { title: 'Envie de nouveaux amis', desc: "Je veux me faire de nouveaux amis à Akita, mais il n'y a pas beaucoup d'endroits pour se rencontrer..." },
          { title: 'Intéressé par les jeux de société', desc: "Je veux essayer les jeux de société, mais je ne connais pas les règles et je n'ai personne avec qui jouer..." },
          { title: 'Routine du week-end monotone', desc: 'Toujours la même routine, envie de trouver de nouveaux passe-temps et plaisirs...' }
        ]
      },
      solution: {
        title: 'Parfait pour vous !',
        lead: 'Les jeux de société consistent à profiter de la communication. Pas à travers les écrans mais <strong>"de vraies connexions avec les gens"</strong>.<br />Un endroit où vous pouvez voir divers côtés inattendus des gens, comme les expressions faciales, le ton de la voix, l\'atmosphère et les événements inattendus.<br />Les étrangers deviennent amicaux en quelques minutes - c\'est le charme mystérieux des jeux de société.',
        features: [
          { title: 'Expérience riche utilisant les cinq sens', desc: 'La sensation tactile de déplacer les pièces à la main, le rire de tout le monde, et une série d\'actions auxquelles vous ne penseriez normalement pas. Vous pouvez profiter de l\'ambiance avec tout votre corps.' },
          { title: 'Rencontres et amitiés naturelles', desc: 'Les conversations naissent naturellement à travers les jeux, créant de nouvelles connexions au-delà des positions sociales. Jouons naturellement, loin de l\'agitation de la vie quotidienne.' },
          { title: 'Soutien sûr pour les débutants', desc: 'La sélection de jeux est très importante ! Le personnel suggérera les meilleurs jeux en fonction de l\'expérience et des préférences des participants !' }
        ]
      },
      flow: {
        title: 'Déroulement de l\'événement',
        steps: [
          { number: 'ÉTAPE 1', title: 'Réception et arrivée', desc: 'D\'abord, inscrivez-vous à la réception ! Ensuite, créez un "badge avec votre surnom" pour vous appeler mutuellement pendant les jeux !' },
          { number: 'ÉTAPE 2', title: 'Sélection de jeux', desc: 'Plus de 150 types de jeux + jeux apportés par les participants ! Si c\'est votre première fois, parlez au personnel ! Nous suggérerons des jeux recommandés en fonction de votre âge et de votre expérience ! Nous aidons également à ajuster le nombre de joueurs pour les jeux !' },
          { number: 'ÉTAPE 3', title: 'Apprendre les règles et jouer', desc: 'Apprenez les règles en lisant le manuel ou en regardant les vidéos d\'explication des règles depuis le QR code en bas à droite de la boîte ! Si vous êtes inquiet, parlez au personnel ! Le personnel expliquera les règles aux débutants. Ensuite, jouez simplement ! Vous pourriez découvrir que des heures sont passées... lol' },
          { number: 'ÉTAPE 4', title: 'Ranger et partir', desc: 'Rangez les jeux après avoir joué ! Si vous ne savez pas comment ranger, demandez au personnel à proximité !<br />Pour permettre à de nombreux participants de jouer, veuillez coopérer en jouant un jeu à la fois !<br />L\'entrée et la sortie sont libres. Veuillez rendre votre badge à la réception en partant.' }
        ]
      },
      testimonials: {
        title: 'Témoignages des participants',
        items: [
          { age: 'Homme dans la soixantaine', text: "Je ne savais pas qu'Akita avait un tel événement ! Je pensais qu'il n'y avait que le Go et le Shogi, j'ai été surpris par autant de jeux." },
          { age: 'Homme dans la quarantaine', text: "Je suis muté ici, mais j'ai trouvé des amis. Je reviendrai jouer !" },
          { age: 'Femme dans la trentaine', text: 'Même un parent et un enfant débutants ont pu profiter !' },
          { age: 'Garçon adolescent', text: 'Tout était amusant !' },
          { age: 'Femme dans la quarantaine', text: 'J\'espérais qu\'il y aurait un endroit pour que les enfants jouent avec des jeux de société, c\'était vraiment amusant.' },
          { age: 'Femme dans la vingtaine', text: 'C\'était bien que ce soit modérément difficile et simple à jouer. J\'ai aimé pouvoir communiquer avec les gens de manière amusante.' }
        ]
      },
      faq: {
        title: 'FAQ',
        items: [
          { q: 'La participation est-elle vraiment gratuite ?', a: 'Oui, complètement gratuite. Vous pouvez venir les mains vides. Dans le but de transmettre le charme des jeux de société aux personnes inexpérimentées, tous les frais d\'installation du lieu sont pris en charge par les organisateurs. Les dons et parrainages sont très bienvenus !' },
          { q: 'Je suis inexpérimenté avec les jeux eux-mêmes. Puis-je quand même participer ?', a: 'Bien sûr ! Les débutants et les personnes inexpérimentées sont les bienvenus. Le personnel expliquera soigneusement les règles, alors participez en toute confiance.' },
          { q: 'L\'inscription préalable est-elle requise ?', a: 'L\'inscription préalable n\'est pas requise, mais faire une réservation à l\'avance nous permet de vous guider en douceur. Veuillez postuler depuis <a href="#reservation">ce formulaire de réservation de participation</a> !' },
          { q: 'Y a-t-il une limite d\'âge ?', a: 'Il n\'y a pas de limite d\'âge. Des personnes d\'un large éventail d\'âges participent. Tout le monde est le bienvenu.\nCependant, si vous participez avec des enfants en 2e année ou moins, les parents doivent les accompagner. Nous refusons fermement les comportements tels que laisser la garde d\'enfants entièrement au personnel.' },
          { q: 'Puis-je rejoindre en cours ou partir tôt ?', a: 'Oui, vous le pouvez. Vous pouvez participer ou partir à tout moment pendant les heures de l\'événement. N\'hésitez pas à venir.' },
          { q: 'Y a-t-il un parking ?', a: "Minna no Jikka Kadowaki-ke et Akita Bay Paradise ont un parking gratuit. Veuillez utiliser le parking payant à proximité pour Akita City Cultural Creation Center et Yokote City Exchange Center/Y2 Plaza. Les autres lieux nécessitent également généralement l'utilisation d'un parking payant à proximité." }
        ]
      },
      schedule: {
        title: 'Prochain événement',
        eventName: 'Rencontre Jeux de Société : Ke.',
        loading: 'Chargement des informations du prochain événement...',
        cta: 'Rejoindre cet événement',
        moreInfo: 'Pour les autres horaires, veuillez consulter',
        here: 'ici',
        moreInfo2: '.',
        months: ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'],
        weekdays: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
        eventCountPrefix: '#',
        eventCountSuffix: ''
      },
      contact: {
        title: 'Contact',
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Jean Dupont',
        emailPlaceholder: 'exemple@email.com',
        messagePlaceholder: 'N\'hésitez pas à nous faire part de vos questions ou demandes',
        submit: 'Envoyer',
        sending: 'Envoi en cours...'
      },
      sns: {
        title: 'Consultez les dernières informations sur les réseaux sociaux !',
        subtitle: 'Nous fournissons les dernières informations sur les événements et les activités des participants'
      },
      backToTop: 'Retour en haut'
    }
  };

  // 現在の言語のテキストを取得
  const t = translations[currentLanguage];

  // 言語切り替え関数
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  // ギャラリー用の画像データ（翻訳対応）
  const galleryImages = t.gallery.captions.map((caption, index) => ({
    src: `/images/ke_gallery/image${index + 1}.png`,
    alt: caption,
    caption: caption
  }));

  // Google Sheetsからイベントデータを取得
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const sheetsService = new GoogleSheetsService();
        const nextEvent = await sheetsService.getNextEventInfo();
        
        if (nextEvent) {
          setEventData({
            eventCount: nextEvent.eventCount,
            date: nextEvent.date,
            venue: nextEvent.venue,
            venueAddress: nextEvent.venueAddress
          });
        }
      } catch (error) {
        // エラー時はデフォルト値を使用
      } finally {
        setEventLoading(false);
      }
    };

    fetchEventData();
  }, []);

  // スクロール位置を監視
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300); // 300px以上スクロールしたら表示
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 言語ドロップダウンの外側クリック検出
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangMenuOpen && !event.target.closest('.ke-language-switcher')) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangMenuOpen]);

  // トップへ戻る関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // スライダーナビゲーション関数
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // GAS WebアプリのURL
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwGhOV6W4DoMTK9Zagbdjqq0KVx0KVThPqFtIzbFG__fine1Kez4_EmO7G9TwMiYrIGbg/exec';

    // HTMLフォーム送信でCORS回避
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = GAS_WEB_APP_URL;
    hiddenForm.target = '_blank'; // 新しいタブで結果ページを開く

    // フォームデータを追加
    const formData = {
      formType: 'ke',
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      user_phone: form.current.user_phone?.value || '',
      participation_date: form.current.participation_date?.value || '',
      participation_count: form.current.participation_count?.value || '',
      message: form.current.message.value
    };

    Object.keys(formData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key] || '';
      hiddenForm.appendChild(input);
    });

    // フォームを送信
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    // ユーザーフィードバック
    setMessage('Ke.イベント参加お申し込みを送信いたしました。確認画面が新しいタブで開きます。自動返信メールをご確認ください。');
    form.current.reset();
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Ke. テーブルゲーム交流会 - YOLUBE</title>
        <meta name="description" content="毎月開催！テーブルゲーム交流会「Ke.」年齢不問！参加費無料！予約不要！初心者大歓迎！" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yolube.jp/ke" />
        <meta property="og:title" content="Ke. テーブルゲーム交流会 - YOLUBE" />
        <meta property="og:description" content="毎月開催！テーブルゲーム交流会「Ke.」年齢不問！参加費無料！予約不要！初心者大歓迎！" />
        <meta property="og:image" content="https://yolube.jp/images/OGP_ke_FB.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://yolube.jp/ke" />
        <meta name="twitter:title" content="Ke. テーブルゲーム交流会 - YOLUBE" />
        <meta name="twitter:description" content="毎月開催！テーブルゲーム交流会「Ke.」年齢不問！参加費無料！予約不要！初心者大歓迎！" />
        <meta name="twitter:image" content="https://yolube.jp/images/OGP_ke_X.jpg" />
      </Helmet>

      <div className="ke-lp">
        {/* Header */}
        <header className="ke-header">
        <div className="ke-header-container">
          <div className="ke-logo">
            <a href="https://yolube.jp" target="_blank" rel="noopener noreferrer">
              <img src="/images/YOLUBE_logo.png" alt="YOLUBE" loading="eager" />
            </a>
          </div>
          <nav className={`ke-nav ${isMobileMenuOpen ? 'ke-nav-open' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a>
            <a href="#schedule" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.schedule}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</a>

            {/* Mobile Language Switcher */}
            <div className="ke-mobile-lang-switcher">
              <button onClick={() => { changeLanguage('ja'); setIsMobileMenuOpen(false); }}>
                日本語
              </button>
              <button onClick={() => { changeLanguage('en'); setIsMobileMenuOpen(false); }}>
                English
              </button>
              <button onClick={() => { changeLanguage('vi'); setIsMobileMenuOpen(false); }}>
                Tiếng Việt
              </button>
              <button onClick={() => { changeLanguage('de'); setIsMobileMenuOpen(false); }}>
                Deutsch
              </button>
              <button onClick={() => { changeLanguage('ko'); setIsMobileMenuOpen(false); }}>
                한국어
              </button>
              <button onClick={() => { changeLanguage('zh'); setIsMobileMenuOpen(false); }}>
                中文
              </button>
              <button onClick={() => { changeLanguage('fr'); setIsMobileMenuOpen(false); }}>
                Français
              </button>
            </div>
          </nav>
          
          {/* Language Switcher */}
          <div className="ke-language-switcher">
            <button
              className="ke-lang-globe-btn"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              aria-label="言語切り替え"
            >
              <FontAwesomeIcon icon={faGlobe} />
            </button>
            {isLangMenuOpen && (
              <div className="ke-lang-dropdown">
                <button onClick={() => { changeLanguage('ja'); setIsLangMenuOpen(false); }}>
                  日本語
                </button>
                <button onClick={() => { changeLanguage('en'); setIsLangMenuOpen(false); }}>
                  English
                </button>
                <button onClick={() => { changeLanguage('vi'); setIsLangMenuOpen(false); }}>
                  Tiếng Việt
                </button>
                <button onClick={() => { changeLanguage('de'); setIsLangMenuOpen(false); }}>
                  Deutsch
                </button>
                <button onClick={() => { changeLanguage('ko'); setIsLangMenuOpen(false); }}>
                  한국어
                </button>
                <button onClick={() => { changeLanguage('zh'); setIsLangMenuOpen(false); }}>
                  中文
                </button>
                <button onClick={() => { changeLanguage('fr'); setIsLangMenuOpen(false); }}>
                  Français
                </button>
              </div>
            )}
          </div>
          <button 
            className="ke-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </header>

      {/* Top Logo Section */}
      <section className="ke-top-logo">
        <div className="ke-container">
          <div className="ke-logo-container">
            <img src="/images/ke_mainImage.svg" alt="Ke. ロゴ" className="ke-main-logo" loading="eager" fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="ke-sponsors">
        <div className="ke-container">
          <div className="ke-sponsors-content">
            <div className="ke-sponsor-group">
              <h3 className="ke-sponsor-title">{t.sponsors.cooperation}</h3>
              <div className="ke-sponsor-list">
                <a href="https://all-akita-furusato.jp/" target="_blank" rel="noopener noreferrer">
                  <span>みんなの実家 門脇家</span>
                </a>
                <a href="https://rise.webu.jp/" target="_blank" rel="noopener noreferrer">
                  <span>立志塾RISE</span>
                </a>
                <a href="http://baypara.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田ベイパラダイス</span>
                </a>
              </div>
            </div>
            <div className="ke-sponsor-group">
              <h3 className="ke-sponsor-title">{t.sponsors.support}</h3>
              <div className="ke-sponsor-list">
                <a href="https://www.pref.akita.lg.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田県</span>
                </a>
                <a href="https://www.pref.akita.lg.jp/pages/education" target="_blank" rel="noopener noreferrer">
                  <span>秋田県教育委員会</span>
                </a>
                <a href="https://www.city.akita.lg.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田市</span>
                </a>
                <a href="https://youthpal-akita.com/" target="_blank" rel="noopener noreferrer">
                  <span>一般財団法人秋田県青年会館</span>
                </a>
                <a href="https://www.akita-abs.co.jp/" target="_blank" rel="noopener noreferrer">
                  <span>ABS秋田放送</span>
                </a>
                <a href="https://www.cna.ne.jp/" target="_blank" rel="noopener noreferrer">
                  <span>CNA秋田ケーブルテレビ</span>
                </a>
                <a href="https://www.sakigake.jp/" target="_blank" rel="noopener noreferrer">
                  <span>秋田魁新報社</span>
                </a>
                <a href="https://mutsumi-l.co.jp/" target="_blank" rel="noopener noreferrer">
                  <span>むつみ造園土木株式会社</span>
                </a>
                <a href="https://kitaho.or.jp/yg88/news/4885.html" target="_blank" rel="noopener noreferrer">
                  <span>株式会社EGEN</span>
                </a>
                <a href="https://x.com/icepick_yokote" target="_blank" rel="noopener noreferrer">
                  <span>一般社団法人ICEPICK</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="ke-hero">
        <div className="ke-hero-bg">
          <div className="ke-hero-content">
            <div className="ke-hero-text">
              <h1 className="ke-title">
                <span className="ke-title-main">{t.hero.title1}</span>
                <span className={`ke-title-sub ${['en', 'vi', 'zh'].includes(currentLanguage) ? 'ke-title-sub-small' : 'ke-title-sub-large'}`}>
                  {t.hero.title2}
                </span>
              </h1>
              <div className="ke-hero-badges">
                <div className="ke-badge">
                  <span>{t.hero.badge1}</span>
                </div>
                <div className="ke-badge">
                  <span>{t.hero.badge2}</span>
                </div>
                <div className="ke-badge">
                  <span>{t.hero.badge3}</span>
                </div>
              </div>
              <div className="ke-hero-stats">
                <div id="about" className="ke-anchor-point"></div>
                <div className="ke-description-text">
                  <p dangerouslySetInnerHTML={{ __html: t.hero.aboutTitle }}></p>
                  <p>{t.hero.description1}</p>
                  <p>{t.hero.description2}</p>
                  <p>{t.hero.description3}</p>
                  <p>{t.hero.description4}</p>
                </div>
              </div>
              <div className="ke-hero-buttons">
                <a href="#reservation" className="ke-btn ke-btn-primary">
                  {t.hero.btn1}
                </a>
                <a href="#sns" className="ke-btn ke-btn-outline">
                  {t.hero.btn2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="ke-problem">
        <div className="ke-container">
          <h2 className="ke-section-title" dangerouslySetInnerHTML={{ __html: t.problem.title }}></h2>
          <div className="ke-problem-grid">
            {t.problem.items.map((item, index) => (
              <div key={index} className="ke-problem-item">
                <div className="ke-problem-icon">
                  <img src={`/images/10${index + 1}.jpeg`} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="ke-solution">
        <div className="ke-container">
          <h2 className="ke-section-title" dangerouslySetInnerHTML={{ __html: t.solution.title }}></h2>
          <div className="ke-solution-content">
            <div className="ke-solution-text">
              <p className="ke-solution-lead" dangerouslySetInnerHTML={{ __html: t.solution.lead }}></p>
              <div className="ke-features">
                {t.solution.features.map((feature, index) => (
                  <div key={index} className="ke-feature">
                    <div className="ke-feature-icon">
                      <img src={`/images/20${index + 1}.jpeg`} alt={feature.title} />
                    </div>
                    <div className="ke-feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="ke-hero-buttons">
            <a href="#reservation" className="ke-btn ke-btn-primary">
              {t.hero.btn1}
            </a>
            <a href="#sns" className="ke-btn ke-btn-outline">
              {t.hero.btn2}
            </a>
          </div>
        </div>
      </section>


      {/* Event Flow Section */}
      <section className="ke-flow">
        <div className="ke-container">
          <h2 className="ke-section-title">{t.flow.title}</h2>
          <div className="ke-flow-steps">
            {t.flow.steps.map((step, index) => (
              <div key={index} className="ke-flow-step">
                <div className="ke-flow-number">{step.number}</div>
                <div className="ke-flow-content">
                  <h3>{step.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: step.desc.replace(/\n/g, '</p><p>') }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="ke-testimonials">
        <div className="ke-container">
          <h2 className="ke-section-title">{t.testimonials.title}</h2>
          <div className="ke-testimonials-grid">
            {t.testimonials.items.map((item, index) => {
              const avatarImages = ['60old_man.png', '40old_man.png', '30oldwoman.png', '10oldboy.png', '40oldwoman.png', '20oldwoman.png'];
              const classes = index === 1 || index === 2 ? 'ke-testimonial ke-testimonial-medium' : index === 3 ? 'ke-testimonial ke-testimonial-short' : 'ke-testimonial';
              return (
                <div key={index} className={classes}>
                  <div className="ke-testimonial-content">
                    <div className="ke-testimonial-avatar">
                      <img src={`/images/${avatarImages[index]}`} alt={item.age} />
                      <div className="ke-testimonial-avatar-badge">{item.age}</div>
                    </div>
                    <div className="ke-testimonial-text">
                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="ke-gallery">
        <div className="ke-container">
          <h2 className="ke-section-title">{t.gallery.title}</h2>
          <div className="ke-gallery-slider">
            <div className="ke-slider-container">
              <div 
                className="ke-slider-wrapper" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="ke-slide">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      onError={(e) => {
                        // 画像がない場合のプレースホルダー表示
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="ke-slide-placeholder" style={{ display: 'none' }}>
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{image.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <button className="ke-slider-btn ke-slider-prev" onClick={prevSlide}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="ke-slider-btn ke-slider-next" onClick={nextSlide}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            
            {/* Indicators */}
            <div className="ke-slider-indicators">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`ke-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            
            {/* Caption */}
            <div className="ke-slider-caption">
              <p>{galleryImages[currentSlide]?.caption}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="ke-hero-buttons">
            <a href="#reservation" className="ke-btn ke-btn-primary">
              {t.hero.btn1}
            </a>
            <a href="#sns" className="ke-btn ke-btn-outline">
              {t.hero.btn2}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ke-faq">
        <div className="ke-container">
          <h2 className="ke-section-title">{t.faq.title}</h2>
          <div className="ke-faq-list">
            {t.faq.items.map((item, index) => (
              <div key={index} className="ke-faq-item">
                <div className="ke-faq-question">
                  <h3>{item.q}</h3>
                </div>
                <div className="ke-faq-answer">
                  <div dangerouslySetInnerHTML={{ __html: item.a.replace(/\n/g, '<br />') }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="ke-schedule">
        <div className="ke-container">
          <h2 className="ke-section-title">{t.schedule.title}</h2>
          <div className="ke-schedule-wrapper">
            {eventLoading ? (
              <div className="ke-event-loading">
                <div className="ke-loading-spinner"></div>
                <p>{t.schedule.loading}</p>
              </div>
            ) : (
              <div className="ke-event-card">
                <div className="ke-event-date">
                  <span className="ke-date-text">
                    {(() => {
                      const monthNum = parseInt(eventData.date.month);
                      const dayNum = parseInt(eventData.date.day);
                      const weekdayNum = ['日', '月', '火', '水', '木', '金', '土'].indexOf(eventData.date.weekday);

                      if (currentLanguage === 'ja') {
                        return `${eventData.date.month}${eventData.date.day}（${eventData.date.weekday}）`;
                      } else if (currentLanguage === 'en') {
                        return `${t.schedule.months[monthNum - 1]} ${dayNum} (${t.schedule.weekdays[weekdayNum]})`;
                      } else {
                        return `${t.schedule.months[monthNum - 1]} ${dayNum} (${t.schedule.weekdays[weekdayNum]})`;
                      }
                    })()}
                  </span>
                </div>

                <div className="ke-event-content">
                  <h3 className="ke-event-title">
                    <span className="ke-event-count">
                      {(() => {
                        const countNum = eventData.eventCount.match(/\d+/)?.[0];
                        return `${t.schedule.eventCountPrefix}${countNum}${t.schedule.eventCountSuffix}`;
                      })()}
                    </span>
                    <span className={`ke-event-name ${(t.schedule.eventName.length >= 15) ? 'ke-event-name-long' : ''}`}>
                      {t.schedule.eventName}
                    </span>
                  </h3>

                  <div className="ke-event-details">
                    <div className="ke-detail-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>10:00 - 20:00</span>
                    </div>

                    <div className="ke-detail-item">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <span>{eventData.venue}</span>
                    </div>
                  </div>

                  {eventData.venueAddress && (
                    <div className="ke-event-map">
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(eventData.venueAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed&hl=${currentLanguage}`}
                        width="100%"
                        height="300"
                        style={{border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${eventData.venue}の地図`}
                      ></iframe>
                    </div>
                  )}

                  <div className="ke-event-cta">
                    <a href="#reservation" className="ke-cta-button">
                      {t.schedule.cta}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Link to full schedule */}
          <div className="ke-schedule-link">
            <p>
              {t.schedule.moreInfo}
              <a
                href="https://docs.google.com/spreadsheets/d/14roOdnMm4kdnL64OWkXdgMJ_qSampUuzr-tvEGeGhb4/edit?gid=0#gid=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.schedule.here}
              </a>
              {t.schedule.moreInfo2}
            </p>
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <ReservationForm currentLanguage={currentLanguage} />

      {/* Reservation Status Section */}
      <ReservationStatus currentLanguage={currentLanguage} />

      {/* Contact Section */}
      <section id="contact" className="ke-contact">
        <div className="ke-container">
          <h2 className="ke-section-title">{t.contact.title}</h2>
          <div className="ke-contact-content">
            <div className="ke-contact-form">
              <form ref={form} onSubmit={handleSubmit} className="ke-form">
                {/* ハニーポット（スパム対策） */}
                <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />

                <div className="ke-form-group">
                  <label htmlFor="user_name">{t.contact.name}</label>
                  <input
                    id="user_name"
                    type="text"
                    name="user_name"
                    placeholder={t.contact.namePlaceholder}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label htmlFor="user_email">{t.contact.email}</label>
                  <input
                    id="user_email"
                    type="email"
                    name="user_email"
                    placeholder={t.contact.emailPlaceholder}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="ke-form-group">
                  <label htmlFor="message">{t.contact.message}</label>
                  <textarea
                    id="message"
                    rows="4"
                    name="message"
                    placeholder={t.contact.messagePlaceholder}
                    required
                    disabled={isLoading}
                  ></textarea>
                </div>

                {message && (
                  <div className={`ke-form-message ${message.includes('エラー') ? 'error' : 'success'}`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className={`ke-btn ke-btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? t.contact.sending : t.contact.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SNS Links Section */}
      <section id="sns" className="ke-sns">
        <div className="ke-container">
          <div className="ke-sns-content">
            <h2 className="ke-sns-title" dangerouslySetInnerHTML={{ __html: t.sns.title }}></h2>
            <p className="ke-sns-subtitle" dangerouslySetInnerHTML={{ __html: t.sns.subtitle }}></p>
            <div className="ke-sns-links">
              <a
                href="https://x.com/_YOLUBE_"
                target="_blank"
                rel="noopener noreferrer"
                className="ke-sns-link ke-sns-x"
              >
                <img src="/images/SVG/sns_x.svg" alt="X (Twitter)" />
              </a>
              <a
                href="https://www.facebook.com/YOLUBE.AKITA"
                target="_blank"
                rel="noopener noreferrer"
                className="ke-sns-link ke-sns-facebook"
              >
                <img src="/images/SVG/sns_fb.svg" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/_yolube_/"
                target="_blank"
                rel="noopener noreferrer"
                className="ke-sns-link ke-sns-instagram"
              >
                <img src="/images/SVG/sns_insta.svg" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          className="ke-back-to-top" 
          onClick={scrollToTop}
          aria-label="トップへ戻る"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}

      {/* Footer */}
      <footer className="ke-footer">
        <div className="ke-container">
          <div className="ke-footer-content">
            <div className="ke-footer-logo">
              <a href="https://yolube.jp" target="_blank" rel="noopener noreferrer">
                <img src="/images/YOLUBE_logo.png" alt="YOLUBE" loading="lazy" />
              </a>
            </div>
            <div className="ke-footer-text">
            </div>
          </div>
          <div className="ke-footer-bottom">
            <p>&copy; 2025 YOLUBE. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default KeLPWeb3; 