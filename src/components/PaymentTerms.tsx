import { useLanguage } from '@/contexts/LanguageContext';

const PaymentTerms = () => {
  const { t } = useLanguage();

  const paymentSchedule = [
    { stage: t('payment.reservation'), milestone: '', amount: 'THB 200,000' },
    { stage: t('payment.first'), milestone: t('payment.milestone.sign'), amount: '30%' },
    { stage: t('payment.second'), milestone: t('payment.milestone.ground'), amount: '20%' },
    { stage: t('payment.third'), milestone: t('payment.milestone.roof'), amount: '20%' },
    { stage: t('payment.fourth'), milestone: t('payment.milestone.electrical'), amount: '20%' },
    { stage: t('payment.fifth'), milestone: t('payment.milestone.ceiling'), amount: '10%' },
    
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            {t('payment.title')}
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            {t('payment.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navbar text-navbar-foreground">
                <tr>
                  <th className="px-2 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-left text-xs md:text-sm lg:text-base font-semibold">{t('payment.stage')}</th>
                  <th className="px-2 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-left text-xs md:text-sm lg:text-base font-semibold">{t('payment.milestone.label')}</th>
                  <th className="px-2 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right text-xs md:text-sm lg:text-base font-semibold">{t('payment.amount')}</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((payment, index) => (
                  <tr 
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors bg-white"
                  >
                    <td className="px-2 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-xs md:text-sm lg:text-base font-medium text-gray-900">{payment.stage}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-xs md:text-sm lg:text-base text-gray-600">{payment.milestone}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-right text-xs md:text-sm lg:text-base font-semibold text-primary">{payment.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center text-xs md:text-sm text-gray-600">
          <p>{t('payment.note')}</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentTerms;
