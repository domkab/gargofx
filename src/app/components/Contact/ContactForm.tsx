import clsx from 'clsx';
import CustomSelect from './CustomSelect';
import styles from '@/styles/components/contact.module.scss';
import TextInput from './TextInput';
import AgreeCheckbox from './AgreeCheckbox';

export default async function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/mnndyryb"
      method="POST"
      className={styles['contact__form']}
    >
      <input
        type="hidden"
        name="_next"
        value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`}
      />

      <div className="groups flex flex-col md:flex-row gap-6 w-full">

        <div className="group flex flex-col flex-1 gap-6">
          <TextInput
            name="topic"
            placeholder="I’d love to chat about"
            required
          />

          <div className={clsx(styles['contact__form-input-container'])}>
            <CustomSelect
              name="budget"
              placeholder="Select budget"
              required
              options={[
                { label: '< $1,000', value: 'under-1k' },
                { label: '$1,000 – $5,000', value: '1k-5k' },
                { label: '$5,000 – $10,000', value: '5k-10k' },
                { label: '> $10,000', value: '10k+' },
              ]}
            />
          </div>

          <div className={clsx(styles['contact__form-input-container'])}>
            <CustomSelect
              name="referrer"
              placeholder="How did you find us?"
              required
              options={[
                { label: 'Google search', value: 'google' },
                { label: 'Social media', value: 'social' },
                { label: 'Online ad (Google, Facebook, etc.)', value: 'ads' },
                { label: 'A friend or colleague', value: 'referral' },
                { label: 'YouTube', value: 'youtube' },
              ]}
            />
          </div>
        </div>

        <div className="group flex flex-col flex-1 gap-6">
          {[
            { name: 'name', placeholder: 'Your name' },
            { name: 'company', placeholder: 'Company (optional)' },
            { name: 'email', placeholder: 'Your email', type: 'email' },
          ].map(({ name, placeholder, type = 'text' }, i) => (
            <TextInput
              key={i}
              name={name}
              placeholder={placeholder}
              type={type}
              required={name !== 'company'}
            />
          ))
          }
        </div>
      </div>

      {/* Checkbox & button */}
      <AgreeCheckbox />
    </form >
  );
}