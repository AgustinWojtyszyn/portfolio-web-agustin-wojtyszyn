import {FC, memo, useCallback, useMemo, useState} from 'react';

import {useLanguage} from '../../../context/LanguageContext';
import {getUiText} from '../../../data/data';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = memo(() => {
  const {language} = useLanguage();
  const uiText = getUiText(language);

  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      const fieldData: Partial<FormData> = {[name]: value};

      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      /**
       * This is a good starting point to wire up your form submission logic
       * */
      console.log('Data to send: ', data);
    },
    [data],
  );

  const inputClasses =
    'rounded-md border border-blue-100/10 bg-neutral-700/70 text-sm text-neutral-200 placeholder:text-sm placeholder:text-neutral-400 transition-colors duration-300 focus:border-orange-400/60 focus:outline-none focus:ring-1 focus:ring-orange-600';

  return (
    <form
      className="grid min-h-[320px] grid-cols-1 gap-y-4 rounded-2xl border border-blue-100/15 bg-slate-900/30 p-5 sm:p-6"
      method="POST"
      onSubmit={handleSendMessage}>
      <input
        className={inputClasses}
        name="name"
        onChange={onChange}
        placeholder={uiText.contactFormName}
        required
        type="text"
      />
      <input
        autoComplete="email"
        className={inputClasses}
        name="email"
        onChange={onChange}
        placeholder={uiText.contactFormEmail}
        required
        type="email"
      />
      <textarea
        className={inputClasses}
        maxLength={250}
        name="message"
        onChange={onChange}
        placeholder={uiText.contactFormMessage}
        required
        rows={6}
      />
      <button
        aria-label="Submit contact form"
        className="ui-btn mt-1 w-max rounded-full border-2 border-orange-500/90 bg-stone-900 px-5 py-2 text-sm font-semibold text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
        type="submit">
        {uiText.contactFormSubmit}
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
