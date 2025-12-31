import { FacebookOutlined, InstagramOutlined, TwitterOutlined, MailOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-16 py-10 text-gray-300">
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto px-4 max-w-7xl">

        {/* О магазине */}
        <div>
          <h2 className="mb-4 font-bold text-white text-lg">SmartStore</h2>
          <p className="text-gray-400">
            Лучшие смартфоны и аксессуары. Быстрая доставка и отличная поддержка.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Навигация</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="hover:text-blue-500 transition">Каталог</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Новинки</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Акции</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Блог</a></li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Контакты</h3>
          <p className="flex items-center gap-2"><MailOutlined /> info@smartstore.com</p>
          <p>+(992) 10000001</p>
          <p>г. Душанбе, Таджикистан</p>
        </div>

        {/* Соцсети */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Следите за нами</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-500 transition"><FacebookOutlined /></a>
            <a href="#" className="hover:text-pink-500 transition"><InstagramOutlined /></a>
            <a href="#" className="hover:text-blue-400 transition"><TwitterOutlined /></a>
          </div>
        </div>

      </div>

      {/* Копирайт */}
      <div className="mt-8 pt-4 border-gray-800 border-t text-gray-500 text-center">
        © 2025 SmartStore. Все права защищены.
      </div>
    </footer>
  );
}
