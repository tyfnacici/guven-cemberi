import type { NextPage } from "next";

const contentData = [
  {
    title: "Uzunluk Önemlidir",
    content: [
      "Güvenli bir şifre en az 12 karakter uzunluğunda olmalıdır. Şifreniz ne kadar uzunsa, tahmin edilmesi o kadar zor olur.",
      "16 karakter veya daha uzun şifreler tercih edilmelidir.",
    ],
  },
  {
    title: "Büyük ve Küçük Harf Kombinasyonu Kullanın",
    content: [
      "Şifrenizde hem büyük hem de küçük harfler bulunmalıdır. Bu, şifrenizin kırılmasını zorlaştırır.",
      'Örneğin, "büyüKhArf" gibi bir yapı kullanabilirsiniz.',
    ],
  },
  {
    title: "Sayılar ve Semboller Ekleyin",
    content: [
      "Şifrenize mutlaka sayılar (0-9 arası) ve semboller (!, @, #, $, vb.) ekleyin.",
      'Örneğin, "K3re$güvenlİ!" gibi bir şifre, sadece harflerden oluşan bir şifreye kıyasla çok daha güvenli olacaktır.',
    ],
  },
  {
    title: "Anlamlı Kelimelerden Kaçının",
    content: [
      "Tahmin edilmesi kolay olan anlamlı kelimeler yerine, rastgele ve anlamsız karakter dizileri kullanın.",
      'Gerçek kelimeler yerine karakterleri karıştırarak şifre oluşturun, örneğin "N3k$t1R!0" gibi.',
    ],
  },
  {
    title: "Yinelenen ve Tahmin Edilebilir Şifreler Kullanmayın",
    content: [
      "Aynı şifreyi birden fazla platformda kullanmak, güvenlik açığı yaratır. Her hesap için farklı şifreler kullanın.",
      '"123456" veya "password" gibi çok kullanılan şifrelerden kaçının.',
    ],
  },
  {
    title: "Kolay Hatırlanır Ama Güçlü Şifreler Tercih Edin",
    content: [
      "Şifrenizin unutulmasını önlemek için kendi belirlediğiniz kurallara göre oluşturun. Örneğin, size özel bir cümleyi ya da ifadeyi alıp bazı harfleri ve kelimeleri sayılar veya sembollerle değiştirebilirsiniz.",
      'Örnek: "S1n1ftaGörüş3m3" gibi bir şifre, hatırlanabilir ama güçlüdür.',
    ],
  },
  {
    title: "Şifre Yöneticisi Kullanın",
    content: [
      "Güçlü ve benzersiz şifreleri oluşturup yönetmek için bir şifre yöneticisi kullanmayı düşünün. Bu yazılımlar, şifrelerinizi güvenli bir şekilde saklar ve hatırlamanızı kolaylaştırır.",
      "Önerilen şifre yöneticileri: LastPass, Bitwarden, 1Password.",
    ],
  },
  {
    title: "İki Faktörlü Kimlik Doğrulama (2FA) Kullanın",
    content: [
      "Şifrenize ek olarak 2FA kullanmak, hesaplarınızı daha da güvenli hale getirir. 2FA ile giriş yaparken şifrenizin yanı sıra bir güvenlik kodu da girmeniz gerekir.",
      "SMS doğrulaması, e-posta veya doğrulama uygulamaları (Google Authenticator gibi) kullanılabilir.",
    ],
  },
  {
    title: "Kişisel Bilgilerden Uzak Durun",
    content: [
      "Şifrenize adınız, doğum tarihiniz veya telefon numaranız gibi kişisel bilgileri dahil etmeyin. Bu bilgiler başkaları tarafından kolayca bulunabilir ve tahmin edilebilir.",
    ],
  },
  {
    title: "Zaman Zaman Şifrenizi Güncelleyin",
    content: [
      "Aynı şifreyi uzun süre kullanmayın. Her 3-6 ayda bir şifrenizi güncellemek, güvenliğinizi artıracaktır.",
      "Özellikle bir platformda güvenlik açığı ortaya çıkarsa, şifrenizi hemen değiştirin.",
    ],
  },
];

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col px-6 gap-y-8 overflow-y-scroll hide-scrollbar">
        <h1 className="text-start font-bold text-3xl text-gray-800 mt-24 mb-2">
          Güvenli Şifre Oluşturma İpuçları
        </h1>

        {contentData.map((section, index) => (
          <div
            key={index}
            className="group hover:bg-gray-50 p-4 rounded-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 mb-3">
              {section.title}:
            </h3>
            {section.content.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className="text-gray-600 leading-relaxed mb-2 group-hover:text-gray-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
