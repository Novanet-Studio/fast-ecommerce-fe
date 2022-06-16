export {};

declare global {
  namespace Square {
    /**
     * Thrown when `accountHolderName` is not provided to the ACH payment tokenize
     * method
     *
     * The bank account holder name must be provided in the parameters of
     * `ach.tokenize({ accountHolderName: string });`
     */
    class PlaidMissingNameError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * Thrown when the `ach` payment method was not initialized.
     */
    class PlaidUninitializedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * Strong customer authentication error
     *
     * Thrown with an exception on the verifyBuyer method
     */
    class VerifyBuyerError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The specified element was not found
     */
    class ElementNotFoundError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * An `eventListener callback` is throwing an unexpected error.
     */
    class InvalidEventListenerCallbackError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * Invalid method parameter errors.
     */
    class InvalidOptionError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * A `PaymentRequest` object is malformed
     */
    class InvalidPaymentRequestError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * A `PaymentRequestUpdate` object is malformed.
     */
    class InvalidPaymentRequestUpdateError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The specified option name does not exist
     */
    class InvalidConfigurationPropertyError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The specified option has an invalid value
     */
    class InvalidConfigurationValueError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The specified field name is invalid
     */
    class InvalidFieldNameError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The hosting client browser is not supported by the Web Payments SDK
     */
    class BrowserNotSupportedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The Web Payments SDK requires HTTPS
     */
    class WebSdkEmbedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The developer has an element with a forbidden/clashing ID on the page.
     */
    class InvalidElementPresentError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The developer attempted to attach a payment method with an invalid selector or element type.
     */
    class InvalidElementTypeError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * Exception thrown when a Payment Method instance is attached more than once.
     */
    class PaymentMethodAlreadyAttachedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * Exception thrown when a Payment Method instance is already destroyed.
     */
    class PaymentMethodAlreadyDestroyedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * A method was called on a payment method before it is attached
     * to a page HTML DOM element.
     */
    class PaymentMethodNotAttachedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * The payment method is not supported, and cannot be used.
     */
    class PaymentMethodUnsupportedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * Thrown when a script tag injecting a global fails to load the global.
     */
    class ScriptLoaderError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * A provided style property is invalid for the payment method.
     */
    class InvalidInputStylePropertyError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * A provided style selector is invalid or unsupported.
     */
    class InvalidInputStyleSelectorError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * A provided style value is invalid for the property.
     */
    class InvalidInputStyleValueError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * An aggregated set of style class errors including all of the issues
     * related to styles provided by an application.
     */
    class InvalidStylesError {
      errors: Array<
        | InvalidInputStyleValueError
        | InvalidInputStylePropertyError
        | InvalidInputStyleSelectorError
      >;
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     */
    class TokenizationError {
      errors: ApplicationError[];
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * Details object of an error that occurred throughout the Web Payment SDK.
     */
    interface ApplicationError {
      /**
       * Additional detail about the error, if applicable.
       */
      detail?: string | undefined;
      /**
       * Particular field that caused the error, if applicable. E.g. Card Number
       */
      field?: string | undefined;
      /**
       * Error message.
       */
      message: string;
      /**
       * Type of error thrown.
       */
      type: string;
    }

    /**
     * Square API Error Format.
     */
    interface SquareApiError {
      /**
       * Indicates which high-level category of error has occurred during a request to the Connect API.
       * https://developer.squareup.com/reference/square/enums/ErrorCategory
       */
      category: ErrorCategory;
      /**
       * Indicates the specific error that occurred during a request to a Square API.
       * https://developer.squareup.com/reference/square/enums/ErrorCode
       */
      code: string;
      detail?: string | undefined;
      field?: string | undefined;
    }

    /**
     * Format of error details returned from verifyBuyer
     */
    interface VerifyBuyerErrorDetails {
      code?: string | undefined;
      message: string;
      type: string;
    }

    /**
     * A generic error to handle internal error conditions unrelated to the state or
     * of the application that is integrating the Web Payments SDK.
     */
    class UnexpectedError {
      message: string;
      name: string;
      stack?: string | undefined;
    }

    /**
     * A buyer
     *
     * The `Contact` includes contact information about the buyer.
     */
    interface Contact {
      /**
       * Street address lines.
       */
      addressLines?: string[];
      /**
       * City/locality name.
       */
      city?: string | undefined;
      /**
       * Two-letter ISO 3166-1 country code.
       */
      countryCode?: string | undefined;
      /**
       * Last/family name.
       */
      familyName?: string | undefined;
      /**
       * First/given name.
       */
      givenName?: string | undefined;
      /**
       * Postal code.
       */
      postalCode?: string | undefined;
      /**
       * State/province/region name.
       */
      state?: string | undefined;
    }

    /**
     * A digital wallet shipping contact
     *
     * `ShippingContact` contains name, address, email, and contact phone information
     * to be shown in a digital wallet payment form.
     */
    interface ShippingContact {
      /**
       * Street address lines.
       */
      addressLines?: string[];
      /**
       * City/locality name.
       */
      city?: string | undefined;
      /**
       * Two-letter ISO 3166-1 country code.
       */
      countryCode?: string | undefined;
      /**
       * Email address.
       */
      email?: string | undefined;
      /**
       * Last/family name.
       */
      familyName?: string | undefined;
      /**
       * First/given name.
       */
      givenName?: string | undefined;
      /**
       * Telephone number.
       */
      phone?: string | undefined;
      /**
       * Postal code.
       */
      postalCode?: string | undefined;
      /**
       * State/province/region name.
       */
      state?: string | undefined;
    }

    /**
     * The errors that can be thrown by the Web Payments SDK
     *
     * `PublicErrors` contains all of the error types that are thrown by the SDK.
     */
    interface PublicErrors {
      BrowserNotSupportedError: typeof BrowserNotSupportedError;
      ElementNotFoundError: typeof ElementNotFoundError;
      InvalidEventListenerCallbackError: typeof InvalidEventListenerCallbackError;
      InvalidOptionError: typeof InvalidOptionError;
      InvalidPaymentRequestError: typeof InvalidPaymentRequestError;
      InvalidPaymentRequestUpdateError: typeof InvalidPaymentRequestUpdateError;
      PaymentMethodUnsupportedError: typeof PaymentMethodUnsupportedError;
      PlaidMissingNameError: typeof PlaidMissingNameError;
      PlaidUninitializedError: typeof PlaidUninitializedError;
      ScriptLoaderError: typeof ScriptLoaderError;
      TokenizationError: typeof TokenizationError;
      UnexpectedError: typeof UnexpectedError;
      VerifyBuyerError: typeof VerifyBuyerError;
      WebSdkEmbedError: typeof WebSdkEmbedError;
    }

    /**
     * Interface for handling any currency
     */
    interface Money {
      amount: number;
      currencyCode: 'GBP' | 'USD';
    }

    /**
     * The ACH Payment Method
     *
     * Initiate ACH transfers by allowing the buyer to choose their bank and enter
     * their bank credentials in a Plaid form.
     */
    interface ACH {
      /**
       * Adds an event listener to the instance of ach.
       * See the Plaid documentation for supported event types and expected metadata.
       * https://plaid.com/docs/#onevent-callback
       */
      addEventListener(
        eventType: string,
        callback: (event: SqEvent) => void
      ): void;
      /**
       * Destroys the ACH payment method. The attached element is emptied and all event listeners are removed.
       */
      destroy(): Promise<undefined>;
      /**
       * Removes an event listener from the instance of ach.
       */
      removeEventListener(
        eventType: string,
        callback: (event: SqEvent) => void
      ): void;
      /**
       * Trigger the ACH authentication flow.
       * Use the token returned to process the payment on your server.
       * Note: If the buyer cancels by closing the Plaid window without completing the
       * transaction, an exception is thrown.
       *
       * @throws {PlaidUninitializedError | PlaidMissingNameError | TokenizationError}
       */
      tokenize(options: AchTokenOptions): Promise<TokenResult>;
    }

    /**
     * Defines an ACH payment options object
     */
    interface AchTokenOptions {
      /**
       * Given name and surname of the bank account holder
       */
      accountHolderName: string;
    }

    /**
     * The result of a request to tokenize a payment card
     *
     * The `TokenResult` carries the status of the request, resulting token, any
     * errors, and details about the payment card used.
     */
    interface TokenResult {
      /**
       * Additional details about the token.
       */
      details?: TokenDetails;
      /**
       * Errors that occurred while attempting to tokenize.
       */
      errors?: Array<TokenErrorDetails | Error>;
      /**
       * Indicates whether the tokenization request was successful.
       */
      status: TokenStatus;
      /**
       * Payment token representing tokenized payment information; for use with
       * relevant Square APIs and buyer verification.
       */
      token?: string | undefined;
    }

    /**
     * Details about the payment card used to create a payment token
     *
     * `TokenDetails` provides the payment card information needed to match a token
     * returned by the SDK with payment card information input by a buyer.
     */
    interface TokenDetails {
      /**
       * Additional information about a tokenized bank account.
       */
      bankAccount?: AchBankAccountDetails;
      /**
       * Additional information about a tokenized card.
       */
      card?: CardDetails;
      /**
       * Additional information about a tokenized gift card.
       */
      giftCard?: GiftCardDetails;
      /**
       * Identifies the payment method that created the token.
       */
      method: MethodType;
      /**
       * Additional information about shipping.
       */
      shipping?: ShippingDetails;
    }

    /**
     * Identifying details of a tokenized bank account
     *
     * This object is returned with ACH payment tokens.
     * The `AchBankAccountDetails` object provides enough bank account information
     * to confirm the bank account used in a purchase. Only the last three digits
     * of the bank account number are provided.
     */
    interface AchBankAccountDetails {
      /**
       * The last three digits of the bank account number.
       */
      accountNumberSuffix: string;
      /**
       * The type of bank account. For example: 'Checking', 'Savings', etc.
       */
      accountType: string;
      /**
       * The name of the bank where the account is held.
       */
      bankName: string;
    }

    /**
     * Identifying details of a processed payment card
     *
     * This object is returned with a successful card payment.
     * The `CardDetails` object provides enough payment card
     * detail to confirm the card used in a purchase but only provides
     * the last four digits of the card number to maintain security.
     */
    interface CardDetails {
      /**
       * Cardholder billing information.
       */
      billing?: Contact;
      /**
       * The card brand.
       */
      brand: CardBrand;
      /**
       * The card type.
       */
      cardType?: CardType;
      /**
       * One- or two-digit month of the card expiration date.
       */
      expMonth: number;
      /**
       * Four-digit year of the card expiration date.
       */
      expYear: number;
      /**
       * The fast four digits of the card number.
       */
      last4: string;
      /**
       * The prepaid card type.
       */
      prepaidType?: PrepaidType;
    }

    /**
     * GiftCard details interface
     *
     * Declares the shape of an object that provides the details of a giftCard .
     */
    interface GiftCardDetails {
      /**
       * The Gift Cards type.
       */
      type: GiftCardType;
    }

    /**
     * Digital wallet shipping contact information and the shipping options
     *
     * The shipping contact information and the product shipping options that are
     * offered to a buyer in a digital payment method such as Apple Pay or Google Pay
     */
    interface ShippingDetails {
      /**
       * The shipping contact information for the token.
       */
      contact?: ShippingContact;
      /**
       * The shipping option for the token.
       */
      option?: ShippingOption;
    }

    /**
     * Digital Wallet shipping option choice
     *
     * The object used to set a product shipping option choice for the
     * buyer in a digital wallet payment such as Apple Pay or Google Pay
     */
    interface ShippingOption {
      /**
       * The amount of this shipping option.
       */
      amount: string;
      /**
       * A unique ID to reference the shipping option.
       */
      id: string;
      /**
       * A short description of this shipping option.
       */
      label: string;
    }

    /**
     * Details object of an error that occurred while attempting to tokenize.
     */
    interface TokenErrorDetails {
      /**
       * Particular field that caused the error, if applicable. E.g. Card Number
       */
      field?: string | undefined;
      /**
       * Error message.
       */
      message: string;
      /**
       * Type of error thrown.
       */
      type: string;
    }

    /**
     * The ApplePay Payment Method.
     *
     * Requests a payment nonce for a payment card stored in an Apple Pay digital wallet.
     */
    interface ApplePay {
      /**
       * Destroys the ApplePay payment method. The attached element is emptied and all event listeners are removed.
       */
      destroy(): Promise<undefined>;
      /**
       * Tokenizes a payment request after validating the buyer. When the buyer completes their interaction
       * with Apple Pay, the returned promise resolves with a tokenResult object. The returned token
       * and buyer details can be used to complete the payment on your server.
       *
       * @throws {UnexpectedError | TokenizationError}
       */
      tokenize(): Promise<TokenResult>;
    }

    /**
     * The credit or debit card payment method
     *
     * An object that has the methods to create and set up a single card payment.
     * Created by `payments.card()`.
     */
    interface Card {
      /**
       * Adds an event listener to the instance of the Card element.
       * Provides specific typings related to card element events.
       */
      addEventListener(
        eventType:
          | 'focusClassAdded'
          | 'focusClassRemoved'
          | 'errorClassAdded'
          | 'errorClassRemoved'
          | 'cardBrandChanged'
          | 'postalCodeChanged'
          | 'escape'
          | 'submit',
        callback: (event: SqEvent<CardInputEvent>) => void
      ): void;
      /**
       * Attaches the Card form to the page.
       *
       * @throws {PaymentMethodAlreadyAttachedError | UnexpectedError}
       */
      attach(selectorOrElement: string | HTMLElement): Promise<undefined>;
      /**
       * Set field input style and behavior of the card payment input fields.
       * For more information about customizing the card form, see available [CardOptions](https://developer.squareup.com/reference/sdks/web/payments/objects/CardOptions).
       *
       * @throws {PaymentMethodNotAttachedError | UnexpectedError}
       */
      configure(options: CardOptions): Promise<undefined>;
      /**
       * Destroys the card payment object. The attached element is emptied and all event listeners are removed.
       */
      destroy(): Promise<boolean>;
      /**
       * Sets the DOM focus of one of the input fields within the credit card form.
       *
       * @throws {InvalidFieldNameError}
       */
      focus(
        field: 'cardNumber' | 'cvv' | 'expirationDate' | 'postalCode'
      ): Promise<boolean>;
      /**
       * Recalculates the size of the card form.
       *
       * The Card component normally automatically resizes based on the size of the buyer's browser,
       * however if the Card component is contained with an element that has a computed style property
       * of "display: none", then the Card component will no longer have a defined width and therefore
       * will not properly resize between mobile and desktop configurations. Upon being displayed again,
       * the Card component will not automatically update its size to match the browser window.
       *
       * This method recalculateSize() can be used to handle this edge case by forcing the Card
       * component to recalculate its size and display appropriately for mobile or desktop.
       *
       * @throws {PaymentMethodNotAttachedError}
       */
      recalculateSize(): void;
      /**
       * Removes an event listener from the instance of the Card element.
       * Provides specific typings related to card element events.
       */
      removeEventListener(
        eventType:
          | 'focusClassAdded'
          | 'focusClassRemoved'
          | 'errorClassAdded'
          | 'errorClassRemoved'
          | 'cardBrandChanged'
          | 'postalCodeChanged'
          | 'escape'
          | 'submit',
        callback: (event: SqEvent<CardInputEvent>) => void
      ): void;
      /**
       * Tokenizes the card payment and returns a nonce.
       *
       * @throws {PaymentMethodNotAttachedError | TokenizationError}
       */
      tokenize(): Promise<TokenResult>;
    }

    /**
     * Input event emitted from the Card and Fields payment method instances.
     *
     * This object contains the current and previous state of an input field that
     * triggered a card input event on buyer actions such as selecting a field, inputting
     * a value, or selecting the next input field.
     */
    interface CardInputEvent {
      cardBrand: string;
      currentState: CardInputEventState;
      eventType: CardInputEventTypes;
      /**
       * The input field that triggered the event
       */
      field: CardFieldNames;
      postalCodeValue: string;
      /**
       * The state of the input field prior to the change that triggered the event
       */
      previousState?: CardInputEventState;
    }

    /**
     * The state of an input field at the time a card input event is triggered
     */
    interface CardInputEventState {
      /**
       * An error style class is applied to the input field due to an input error
       */
      hasErrorClass: boolean;
      /**
       * The input field has been selected
       */
      hasFocusClass: boolean;
      /**
       * The SDK has validated the input field contents
       */
      isCompletelyValid: boolean;
      /**
       * The input field is empty
       */
      isEmpty: boolean;
      /**
       * The input value is not empty and is being validated
       */
      isPotentiallyValid: boolean;
    }

    /**
     * An interface that declares the properties used to customize the appearance
     * and behavior of the card entry form.
     * For more information about applying custom styles to the card form, see the available [CardClassSelectors](https://developer.squareup.com/reference/sdks/web/payments/objects/CardClassSelectors) for styling.
     */
    interface CardOptions {
      /**
       * An alternate postal code input prompt to show the correct
       * prompt for a region
       */
      postalCode?: string | undefined;
      /**
       * A map of .css classes and values that customize the style of the
       * input fields
       */
      style?: CardClassSelectors;
    }

    /**
     * The stylesheet classes assigned to input fields by field state
     *
     * Use this object to set the appearance of Card input fields by their current
     * focus and input validity state. Note: font size has a maximum of 16px.
     *
     * Media Queries can be used with valid CardClassSelectors. Syntax support for [level 3 features](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#media_features)
     */
    interface CardClassSelectors {
      /**
       * The default style of the Card payment method component
       */
      '.input-container'?: Partial<{
        borderColor?: string | undefined;
        borderRadius?: string | undefined;
        /**
         * `border-width` can be specified with 1, 2, 3, or 4 values.
         * It allows for length values of `px` and `em`, or a value of `0`.
         * It does not allow for the keyword value of `thin`, `medium`, or `thick`.
         */
        borderWidth?: string | undefined;
      }>;
      /**
       * The style of the Card payment method component when an input field is in an error state
       */
      '.input-container.is-error'?: Partial<{
        borderColor?: string | undefined;
        /**
         * `border-width` for state properties is `inset`, and starts from the outside border.
         * `border-width` can be specified with 1, 2, 3, or 4 values.
         * It allows for length values of `px` and `em`, or a value of `0`.
         * It does not allow for the keyword value of `thin`, `medium`, or `thick`.
         */
        borderWidth?: string | undefined;
      }>;
      /**
       * The style of the Card payment method component when it has focus
       */
      '.input-container.is-focus'?: Partial<{
        borderColor?: string | undefined;
        /**
         * `border-width` for state properties is `inset`, and starts from the outside border.
         * `border-width` can be specified with 1, 2, 3, or 4 values.
         * It allows for length values of `px` and `em`, or a value of `0`.
         * It does not allow for the keyword value of `thin`, `medium`, or `thick`.
         */
        borderWidth?: string | undefined;
      }>;
      /**
       * The style of the input field helper icon
       */
      '.message-icon'?: Partial<{
        color?: string | undefined;
      }>;
      /**
       * The style of the input field error icon
       */
      '.message-icon.is-error'?: Partial<{
        color?: string | undefined;
      }>;
      /**
       * The style of the input field helper text
       */
      '.message-text'?: Partial<{
        color?: string | undefined;
      }>;
      /**
       * The style of the input field error text
       */
      '.message-text.is-error'?: Partial<{
        color?: string | undefined;
      }>;
      /**
       * The default style of a Card input field
       */
      input?: Partial<{
        backgroundColor?: string | undefined;
        color?: string | undefined;
        fontFamily?: string | undefined;
        fontSize?: string | undefined;
        fontWeight?: string | undefined;
      }>;
      /**
       * The style of an input field when the field is in an error state
       */
      'input.is-error'?: Partial<{
        color?: string | undefined;
      }>;
      /**
       * The style of an input field placeholder when the field is in an error state
       */
      'input.is-error::placeholder'?: Partial<{
        color?: string | undefined;
      }>;
      /**
       * The style of an input field that has focus
       */
      'input.is-focus'?: Partial<{
        backgroundColor?: string | undefined;
        color?: string | undefined;
        fontFamily?: string | undefined;
        fontSize?: string | undefined;
        fontWeight?: string | undefined;
      }>;
      /**
       * The style of an input field placeholder when the field has focus
       */
      'input.is-focus::placeholder'?: Partial<{
        color?: string | undefined;
      }>;
      /**
       * The default style of an input field placeholder
       */
      'input::placeholder'?: Partial<{
        color?: string | undefined;
      }>;
    }

    /**
     * An object with the methods to create and set up a Gift Cards payment.
     *
     * Created by calling the `payments.giftCard()` method.
     */
    interface GiftCard {
      /**
       * Adds an event listener to the GiftCard instance.
       * Provides specific typings related to giftCard element events.
       */
      addEventListener(
        eventType:
          | 'focusClassAdded'
          | 'focusClassRemoved'
          | 'errorClassAdded'
          | 'errorClassRemoved'
          | 'cardBrandChanged'
          | 'postalCodeChanged'
          | 'escape'
          | 'submit',
        callback: (event: SqEvent<GiftCardInputEvent>) => void
      ): void;
      /**
       * Attaches the GiftCard form to the page.
       *
       * @throws {PaymentMethodAlreadyAttachedError | UnexpectedError}
       */
      attach(selectorOrElement: string | HTMLElement): Promise<undefined>;
      /**
       * Configures the GiftCard payment method with visual and behavior options.
       *
       * @throws {PaymentMethodNotAttachedError | UnexpectedError}
       */
      configure(options: GiftCardOptions): Promise<undefined>;
      /**
       * Destroys the payment method. The attached element is emptied and all event listeners are removed.
       */
      destroy(): Promise<boolean>;
      /**
       * Sets the DOM focus of one of the input fields within the GiftCard form.
       */
      focus(field: 'giftCardNumber'): Promise<boolean>;
      /**
       * Removes an event listener from the GiftCard instance.
       * Provides specific typings related to Gift Cards element events.
       */
      removeEventListener(
        eventType:
          | 'focusClassAdded'
          | 'focusClassRemoved'
          | 'errorClassAdded'
          | 'errorClassRemoved'
          | 'cardBrandChanged'
          | 'postalCodeChanged'
          | 'escape'
          | 'submit',
        callback: (event: SqEvent<GiftCardInputEvent>) => void
      ): void;
      /**
       * Tokenizes a GiftCard payment method instance.
       *
       * @throws {PaymentMethodNotAttachedError | TokenizationError}
       */
      tokenize(): Promise<TokenResult>;
    }

    /**
     * GiftCard field event interface
     *
     * Declares the shape of the callback event argument.
     * This object carries the state of a GiftCard input field including styles
     * applied, the state of an input field contents
     */
    interface GiftCardInputEvent {
      /**
       * The brand of the gift card used by the buyer
       */
      cardBrand: string;
      /**
       * The current state of the field that invoked the event
       */
      currentState: CardInputEventState;
      /**
       * The type of the event
       */
      eventType: CardInputEventTypes;
      /**
       * The input field whose state change invoked the event
       */
      field: GiftCardFieldNames;
      /**
       * The state of the field prior to the state change
       */
      previousState?: CardInputEventState;
    }

    /**
     * GiftCard payment method options interface
     *
     * Declares the shape of an object with properties to configure the style and
     * behavior of the gift card payment method. This object is the `options`
     * argument of the `GiftCard.prototype.configure` method.
     */
    interface GiftCardOptions {
      /**
       * CSS class to style the input field
       */
      style?: CardClassSelectors;
    }

    /**
     * The Google Pay Payment Method.
     *
     * Google Pay supports taking payments via credit cards. Utilizing the PaymentRequest object,
     * you can handle Shipping Option selection, as well as collect Shipping and Billing addresses.
     */
    interface GooglePay {
      /**
       * Attaches the Google Pay button to the page.
       *
       * @throws {PaymentMethodUnsupportedError}
       */
      attach(
        selectorOrElement: string | HTMLElement,
        googlePayButtonOptions?: GooglePayButtonOptions
      ): Promise<undefined>;
      /**
       * Destroys this `GooglePay` instance. This method cleans up the `GooglePay` instance and
       * removes the Google Pay button from the page.
       */
      destroy(): Promise<undefined>;
      /**
       * This method presents the Google Pay payment sheet. When the buyer completes their interaction
       * with Google Pay, the returned promise resolves with a tokenResult object. The returned token
       * and buyer details can be used to complete the payment on your server.
       *
       * @throws {UnexpectedError}
       */
      tokenize(): Promise<TokenResult>;
    }

    /**
     * Provides display properties for rendering a Google Pay button
     *
     * This object lets you set the color, size, and button fitting method for
     * a Google Pay button.
     */
    interface GooglePayButtonOptions {
      /**
       * Set the button background color to black or white.
       * For more details about the available options, see [GooglePayButtonColor](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonColor).
       */
      buttonColor?: 'default' | 'black' | 'white';
      /**
       * Set fitting mode to dynamically size button or fixed size.
       * For more details about the available options, see [GooglePayButtonSizeMode](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonSizeMode).
       */
      buttonSizeMode?: 'static' | 'fill';
      /**
       * Render a long or short button.
       * For more details about the available options, see [GooglePayButtonType](https://developer.squareup.com/reference/sdks/web/payments/enums/GooglePayButtonType).
       */
      buttonType?: 'long' | 'short';
    }

    /**
     * Optional parameters provided to the Card payment `tokenize` method
     *
     * Use `CardTokenOptions` to provide a billing contact when required by
     * the seller.
     */
    interface CardTokenOptions {
      /**
       * The buyer to be billed
       */
      billing: Contact;
    }

    /**
     * A single line item in an Apple Pay or Google Pay payment request
     *
     * Line items are optional and can be included in a payment request when there
     * are calculated charges such as taxes and shipping charges added on to a
     * purchase.
     */
    interface LineItem {
      /**
       * The amount of the line item. An amount is given as a string representation
       * float with two decimal places (e.g., `"15.00"`).
       */
      amount: string;
      /**
       * Description or purpose of the line item. This is typically the name of the
       * item or service purchased. If the line item is a payment `total`, the label
       * is instead the merchant name.
       */
      label: string;
      /**
       * Indicates whether the value in the `amount` field represents an estimated
       * or unknown cost.
       */
      pending?: boolean | undefined;
    }

    /**
     * The payments.paymentRequest method argument
     *
     * This object contains the details of a payment request including line items,
     * shipping contact and options, and total payment request.
     */
    interface PaymentRequestOptions {
      /**
       * Required: two-letter ISO 3166-1 country code of the merchant.
       */
      countryCode: string;
      /**
       * Required: two-letter ISO 4217 country currency code
       */
      currencyCode: 'GBP' | 'USD';
      /**
       * Optional: Details line items including any calculated fees and taxes
       */
      lineItems?: LineItem[];
      /**
       * Optional: defaults to false. Requests the buyer to provide billing contact
       * information
       */
      requestBillingContact?: boolean | undefined;
      /**
       * Optional: defaults to false. Requests the buyer to provide shipping contact
       * information
       */
      requestShippingContact?: boolean | undefined;
      /**
       * Pre set the shipping contact
       */
      shippingContact?: ShippingContact;
      /**
       * Optional: Shows a set of shipping options to the buyer
       */
      shippingOptions?: ShippingOption[];
      /**
       * Required: Total amount of purchase including line item amounts.
       */
      total: LineItem;
    }

    /**
     * Interface that describes the object argument of the `paymentRequest.addEventListener` method
     * return value.
     *
     * Use this interface to create an object that contains payment request
     * properties that are to be updated in the digital wallet payment sheet after
     * recalculating fees or catching buyer input errors.
     */
    interface PaymentRequestUpdate {
      /**
       * Allows for an error message when a valid shipping address is not usable.
       */
      error?: string | undefined;
      /**
       * Replaces the current list of line items.
       */
      lineItems?: LineItem[];
      /**
       * Allows for more granular messages when a shipping address is not valid.
       */
      shippingErrors?: ShippingErrors;
      /**
       * Replaces the current list of shipping options.
       */
      shippingOptions?: ShippingOption[];
      /**
       * Replaces the current total.
       */
      total?: LineItem;
    }

    /**
     * Details about digital wallet shipping address errors
     *
     * `ShippingErrors` provides the address field whose value is in error and
     * the details of the error. Each `ShippingError` object describes one address
     * field with its corresponding error.
     */
    interface ShippingErrors {
      /**
       * Indicate the address lines are not valid.
       */
      addressLines?: string | undefined;
      /**
       * Indicate the city/locality is not valid.
       */
      city?: string | undefined;
      /**
       * Indicate the country is not valid.
       */
      country?: string | undefined;
      /**
       * Indicate the postal code is not valid.
       */
      postalCode?: string | undefined;
      /**
       * Indicate the state/province/region is not valid.
       */
      state?: string | undefined;
    }

    /**
     * An object that represents an Apple Pay or Google Pay payment request
     *
     * `PaymentRequest` encapsulates the details of an Apple Pay or Google Pay request
     * for payment and a method for connecting event listeners to the payment request.
     */
    interface PaymentRequest {
      /**
       * Adds an event listener to the PaymentRequest.
       */
      addEventListener(
        event: 'shippingcontactchanged' | 'shippingoptionchanged',
        callback:
          | ((
              contact: ShippingContact
            ) => PaymentRequestUpdate | Promise<PaymentRequestUpdate>)
          | ((
              option: ShippingOption
            ) => PaymentRequestUpdate | Promise<PaymentRequestUpdate>)
      ): void;
      /**
       * Updates the specified options of the PaymentRequest. Returns `true` if the update was
       * successful. Updates are not allowed while the Apple Pay or Google Pay payment sheets are
       * currently being displayed to the buyer. In these cases, `update()` will return `false`.
       *
       * @throws {InvalidPaymentRequestError}
       */
      update(options: Partial<PaymentRequestOptions>): boolean;
    }

    /**
     * Returned by `Square.payments(appId, locationId)`.
     *
     * Use this object to instantiate Payment methods.
     */
    interface Payments {
      /**
       * Creates an ACH payment method instance
       *
       * @throws {UnexpectedError | ScriptLoaderError}
       */
      ach(): Promise<ACH>;
      /**
       * Create an ApplePay payment method instance.
       *
       * @throws {InvalidPaymentRequestError | UnexpectedError}
       */
      applePay(paymentRequest: PaymentRequest): Promise<ApplePay>;
      /**
       * Creates a Card payment method.
       * For more information about customizing the card form, see available [CardOptions](https://developer.squareup.com/reference/sdks/web/payments/objects/CardOptions).
       *
       * @throws {UnexpectedError}
       */
      card(options?: CardOptions): Promise<Card>;
      /**
       * Creates a GiftCard payment method instance.
       *
       * @throws {UnexpectedError}
       */
      giftCard(options?: GiftCardOptions): Promise<GiftCard>;
      /**
       * Create a GooglePay payment method instance.
       *
       * @throws {InvalidPaymentRequestError | UnexpectedError | ScriptLoaderError}
       */
      googlePay(paymentRequest: PaymentRequest): Promise<GooglePay>;
      /**
       * Creates a new PaymentRequest instance that sets up event listeners for GooglePay and ApplePay payment methods.
       */
      paymentRequest(options: PaymentRequestOptions): PaymentRequest;
      /**
       * Sets the locale of the Payments instance. If this method is not called explicitly, the user's browser
       * language specified by `navigator.language` will be used instead. If the language returned by
       * `navigator.language` is unsupported, the SDK falls back to `en-US`.
       *
       * If the specified language passed to setLocale() is not supported, the operation is a no-op.
       * If the specified language is supported, but the specified region is not, Web Payments SDK will fall
       * back to using the desired language in a different supported region.
       *
       * @throws {UnexpectedError}
       */
      setLocale(locale: string): Promise<SetLocaleResult>;
      /**
       * Starts the **Strong Customer Authentication** flow to verify the identity of
       * the payment card holder.
       *
       * @throws {VerifyBuyerError}
       */
      verifyBuyer(
        source: string,
        details: ChargeVerifyBuyerDetails | StoreVerifyBuyerDetails
      ): Promise<VerifyBuyerResponseDetails | object>;
    }

    /**
     * The result of calling `setLocale()` on the WebPaySDK payments instance.
     */
    interface SetLocaleResult {
      /**
       * A message that indicates the result of the setLocale call.
       */
      message?: string | undefined;
      /**
       * The new [BCP 47](https://tools.ietf.org/rfc/bcp/bcp47.txt) locale string after
       * WebPaySDK `setLocale()` was called.
       */
      newLocale: string;
      /**
       * The previous [BCP 47](https://tools.ietf.org/rfc/bcp/bcp47.txt) locale string of
       * the WebPaySDK before `setLocale()` was called.
       */
      previousLocale: string;
    }

    /**
     * The verification details parameter passed, to the `payments.verifyBuyer()` function, for cases in which the buyer is being charged.
     */
    interface ChargeVerifyBuyerDetails {
      /**
       * The total cost of the purchase as a string representation of a number.
       * example value: `'1.00'`.
       */
      amount: string;
      /**
       * The `Contact` information needed to help verify the buyer.
       */
      billingContact: Contact;
      /**
       * 3-letter ISO 4217 currency code.
       */
      currencyCode: string;
      /**
       * Transactional intent of the payment
       */
      intent: 'CHARGE';
    }

    /**
     * The verification details parameter, passed to the `payments.verifyBuyer()` function, for cases in which the card is being stored on file.
     */
    interface StoreVerifyBuyerDetails {
      /**
       * The `Contact` information needed to help verify the buyer.
       */
      billingContact: Contact;
      /**
       * Transactional intent of the payment
       */
      intent: 'STORE';
    }

    /**
     * Response details from the `await payments.verifyBuyer()` function.
     */
    interface VerifyBuyerResponseDetails {
      /**
       * The verification token that is passed to the Payments API.
       */
      token: string;
      /**
       * Whether the buyer went through the Card Issuer's challenge flow to verify the buyer.
       */
      userChallenged: boolean;
    }

    /**
     * An array of programmatically handleable error types for ease of matching
     * using instanceof
     */
    const errors: PublicErrors;

    /**
     * The entry point to Square Payments. Use this method to configure your
     * applicationId and locationId
     *
     * The `payments` object provides the factory functions used to
     * create payment methods.
     *
     * @throws {BrowserNotSupportedError}
     */
    function payments(
      applicationId: string,
      locationId?: string | undefined
    ): Payments;

    /**
     */
    interface BaseVerifyBuyerDetails {
      /**
       * The `Contact` information needed to help verify the buyer.
       */
      billingContact: Contact;
    }

    /**
     * Three-letter ISO 4217 currency code for the payment.
     *
     * This enum is an example and not exhaustive, refer to the ISO standard for a complete listing
     */
    type CurrencyCode = 'GBP' | 'USD';

    /**
     * Enumerates the payment card brands accepted by the Web Payments SDK
     */
    type CardBrand =
      | 'American Express'
      | 'Diners Club'
      | 'Discover'
      | 'JCB'
      | 'Mastercard'
      | 'UnionPay'
      | 'Unknown'
      | 'Visa';

    /**
     * Enum representation of whether a card is a Credit or Debit card, or unknown type if its type cannot be determined.
     */
    type CardType = 'CREDIT' | 'DEBIT' | 'UNKNOWN_CARD_TYPE';

    /**
     * Enum for describing whether the current card is a prepaid card
     */
    type PrepaidType = 'NOT_PREPAID' | 'PREPAID' | 'UNKNOWN_PREPAID_TYPE';

    /**
     * The types of Gift Cards accepted by the Web Payments SDK
     */
    type GiftCardType = 'Gift';

    /**
     * The payment methods accepted by the SDK
     */
    type MethodType = 'ACH' | 'Apple Pay' | 'Card' | 'Gift Card' | 'Google Pay';

    /**
     */
    type TokenStatus =
      | 'Abort'
      | 'Cancel'
      | 'Error'
      | 'Invalid'
      | 'OK'
      | 'Unknown';

    /**
     * All possible Plaid Event Names
     */
    type PlaidEventName =
      | 'CLOSE_OAUTH'
      | 'ERROR'
      | 'EXIT'
      | 'FAIL_OAUTH'
      | 'HANDOFF'
      | 'MATCHED_SELECT_INSTITUTION'
      | 'MATCHED_SELECT_VERIFY_METHOD'
      | 'OPEN'
      | 'OPEN_MY_PLAID'
      | 'OPEN_OAUTH'
      | 'SEARCH_INSTITUTION'
      | 'SELECT_BRAND'
      | 'SELECT_INSTITUTION'
      | 'SUBMIT_CREDENTIALS'
      | 'SUBMIT_MFA'
      | 'TRANSITION_VIEW';

    /**
     * The four input field names in the payment card input form
     */
    type CardFieldNames =
      | 'cardNumber'
      | 'cvv'
      | 'expirationDate'
      | 'postalCode';

    /**
     * Input event types emitted from the Card and Fields payment method instances.
     */
    type CardInputEventTypes =
      | 'cardBrandChanged'
      | 'errorClassAdded'
      | 'errorClassRemoved'
      | 'escape'
      | 'focusClassAdded'
      | 'focusClassRemoved'
      | 'postalCodeChanged'
      | 'submit';

    /**
     * The brands accepted by the Web Payments SDK
     */
    type GiftCardBrand = 'Unknown';

    /**
     * The GiftCard field names on the GiftCard input form
     */
    type GiftCardFieldNames = 'giftCardNumber';

    /**
     * Google Pay shipping address errors
     */
    type GooglePayAddressErrorReason =
      | 'PAYMENT_METHOD_DESTROYED'
      | 'SHIPPING_ADDRESS_INVALID'
      | 'SHIPPING_ADDRESS_UNSERVICEABLE';

    /**
     * The background color of the Google Pay button
     */
    type GooglePayButtonColor = 'black' | 'default' | 'white';

    /**
     * The sizing method used by the SDK to set the size of the Google Pay button
     * when rendered
     */
    type GooglePayButtonSizeMode = 'fill' | 'static';

    /**
     * The Google Pay button width choices
     */
    type GooglePayButtonType = 'long' | 'short';

    /**
     * The events that can be invoked on payment methods that take a PaymentRequest object
     */
    type PaymentRequestEvent =
      | 'shippingcontactchanged'
      | 'shippingoptionchanged';
  }
}
