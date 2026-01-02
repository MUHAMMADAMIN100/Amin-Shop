export default function Footer() {
  return (
    <footer className="bg-black mt-12 border-t">
      <div className="gap-8 grid grid-cols-4 mx-auto px-4 py-10 max-w-7xl">
        <div>
          <h3 className="mb-4 font-bold text-white">Информация</h3>
          <ul className="space-y-2 text-white">
            <li>О компании</li>
            <li>Доставка</li>
            <li>Контакты</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-white">Поддержка</h3>
          <ul className="space-y-2 text-white">
            <li>FAQ</li>
            <li>Гарантия</li>
            <li>Возврат</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-white">Контакты</h3>
          <ul className="space-y-2 text-white">
            <li>+992 123 456 789</li>
            <li>info@aminstore.tj</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-white">Социальные сети</h3>
          <ul className="space-y-2 text-white">
            <li>Telegram</li>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-gray-400 text-sm text-center">
        &copy; 2026 SmartStore. Все права защищены.
      </div>
    </footer>
  );
}
