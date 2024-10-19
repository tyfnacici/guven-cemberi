import type { NextPage } from "next";
import Button from "@/components/Button";

const Home: NextPage = () => {
  return (
    <>
      <div className="absolute top-24 lg:top-8 w-full flex flex-col gap-y-4 px-4 md:w-auto md:flex-row md:gap-x-4 md:justify-center">
        <Button buttonText="İpuçları" />
        <Button buttonText="Kontrol" />
        <Button buttonText="Oluştur" />
      </div>
      <div
        className="relative bg-white p-6 rounded-lg shadow-md w-full mx-auto mt-16 space-y-8 
                      h-full max-h-screen lg:max-h-[700px] lg:max-w-[900px] lg:w-[900px] 
                      overflow-y-auto hide-scrollbar"
      >
        <h1 className="text-start font-bold text-3xl">
          Güvenli Şifre Oluşturma İpuçları
        </h1>

        <div>
          <h3 className="text-xl font-semibold">Uzunluk Önemlidir:</h3>
          <p>
            Güvenli bir şifre en az 12 karakter uzunluğunda olmalıdır. Şifreniz
            ne kadar uzunsa, tahmin edilmesi o kadar zor olur.
          </p>
          <p>16 karakter veya daha uzun şifreler tercih edilmelidir.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Büyük ve Küçük Harf Kombinasyonu Kullanın:
          </h3>
          <p>
            Şifrenizde hem büyük hem de küçük harfler bulunmalıdır. Bu,
            şifrenizin kırılmasını zorlaştırır.
          </p>
          <p>Örneğin, &quot;büyüKhArf&quot; gibi bir yapı kullanabilirsiniz.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Sayılar ve Semboller Ekleyin:
          </h3>
          <p>
            Şifrenize mutlaka sayılar (0-9 arası) ve semboller (!, @, #, $, vb.)
            ekleyin.
          </p>
          <p>
            Örneğin, &quot;K3re$güvenlİ!&quot; gibi bir şifre, sadece harflerden
            oluşan bir şifreye kıyasla çok daha güvenli olacaktır.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Anlamlı Kelimelerden Kaçının:
          </h3>
          <p>
            Tahmin edilmesi kolay olan anlamlı kelimeler yerine, rastgele ve
            anlamsız karakter dizileri kullanın.
          </p>
          <p>
            Gerçek kelimeler yerine karakterleri karıştırarak şifre oluşturun,
            örneğin &quot;N3k$t1R!0&quot; gibi.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Yinelenen ve Tahmin Edilebilir Şifreler Kullanmayın:
          </h3>
          <p>
            Aynı şifreyi birden fazla platformda kullanmak, güvenlik açığı
            yaratır. Her hesap için farklı şifreler kullanın.
          </p>
          <p>
            &quot;123456&quot; veya &quot;password&quot; gibi çok kullanılan
            şifrelerden kaçının.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Kolay Hatırlanır Ama Güçlü Şifreler Tercih Edin:
          </h3>
          <p>
            Şifrenizin unutulmasını önlemek için kendi belirlediğiniz kurallara
            göre oluşturun. Örneğin, size özel bir cümleyi ya da ifadeyi alıp
            bazı harfleri ve kelimeleri sayılar veya sembollerle
            değiştirebilirsiniz.
          </p>
          <p>
            Örnek: &quot;S1n1ftaGörüş3m3&quot; gibi bir şifre, hatırlanabilir
            ama güçlüdür.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Şifre Yöneticisi Kullanın:</h3>
          <p>
            Güçlü ve benzersiz şifreleri oluşturup yönetmek için bir şifre
            yöneticisi kullanmayı düşünün. Bu yazılımlar, şifrelerinizi güvenli
            bir şekilde saklar ve hatırlamanızı kolaylaştırır.
          </p>
          <p>Önerilen şifre yöneticileri: LastPass, Bitwarden, 1Password.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            İki Faktörlü Kimlik Doğrulama (2FA) Kullanın:
          </h3>
          <p>
            Şifrenize ek olarak 2FA kullanmak, hesaplarınızı daha da güvenli
            hale getirir. 2FA ile giriş yaparken şifrenizin yanı sıra bir
            güvenlik kodu da girmeniz gerekir.
          </p>
          <p>
            SMS doğrulaması, e-posta veya doğrulama uygulamaları (Google
            Authenticator gibi) kullanılabilir.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Kişisel Bilgilerden Uzak Durun:
          </h3>
          <p>
            Şifrenize adınız, doğum tarihiniz veya telefon numaranız gibi
            kişisel bilgileri dahil etmeyin. Bu bilgiler başkaları tarafından
            kolayca bulunabilir ve tahmin edilebilir.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Zaman Zaman Şifrenizi Güncelleyin:
          </h3>
          <p>
            Aynı şifreyi uzun süre kullanmayın. Her 3-6 ayda bir şifrenizi
            güncellemek, güvenliğinizi artıracaktır.
          </p>
          <p>
            Özellikle bir platformda güvenlik açığı ortaya çıkarsa, şifrenizi
            hemen değiştirin.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
