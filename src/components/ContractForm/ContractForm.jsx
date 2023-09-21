import './ContractForm.scss';
import { Document, Packer, Paragraph } from 'docx';
import React, { useState, useEffect } from 'react';

function ContractForm() {
  const currentDate = new Date().toISOString().split('T')[0];
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);
  const [reviewComments, setReviewComments] = useState('');

  const [formData, setFormData] = useState({
    dealDate: currentDate,
    deliveryDate: futureDate.toISOString().split('T')[0],
    contract: 'RECS',
    seller: '',
    sellerContact: '',
    buyer: 'OTC Flow',
    buyerContact: 'Eva Van Bergen Henegouw',
    product: '',
    productionPeriod: 'January – June 2023',
    technology: '',
    quantity: '',
    pricePerProduct: '',
    totalPrice: '',
    currency: 'Euro',
    paymentTerms: '',
    vat: 'Amounts exclusive of any VAT. VAT treatment determined pursuant to the laws of the jurisdiction where transaction is deemed to take place',
    law: 'Dutch law',
    jurisdiction: 'Amsterdam District Court, the Netherlands',
  });

  useEffect(() => {
    if (formData.quantity && formData.pricePerProduct) {
      const newTotalPrice = formData.quantity * formData.pricePerProduct;
      if (newTotalPrice !== formData.totalPrice) {
        setFormData({
          ...formData,
          totalPrice: newTotalPrice,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.quantity, formData.pricePerProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    if (specialRequest) {
      console.log("Sending special request to the legal team...");
      // You could use an API call, email or other notification system here
    }

    // Generate .docx file
    const doc1 = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph(`Deal Date: ${formData.dealDate}`),
            new Paragraph(`Contract: ${formData.contract}`),
            new Paragraph(`Seller: ${formData.seller}`),
            new Paragraph(`Seller Contact: ${formData.sellerContact}`),
            new Paragraph(`Buyer: ${formData.buyer}`),
            new Paragraph(`Buyer Contact: ${formData.buyerContact}`),
            new Paragraph(`Product: ${formData.product}`),
            new Paragraph(`Production Period: ${formData.productionPeriod}`),
            new Paragraph(`Technology: ${formData.technology}`),
            new Paragraph(`Quantity: ${formData.quantity}`),
            new Paragraph(`Delivery Date: ${formData.deliveryDate}`),
            new Paragraph(`Price Per Product: ${formData.pricePerProduct}`),
            new Paragraph(`Total Price: ${formData.totalPrice}`),
            new Paragraph(`Currency: ${formData.currency}`),
            new Paragraph(`Payment Terms: Full amount will be paid within ${formData.paymentTerms} business days`),
            new Paragraph(`VAT: ${formData.vat}`),
            new Paragraph(`Law: ${formData.law}`),
            new Paragraph(`Jurisdiction: ${formData.jurisdiction}`),
          ],
        },
      ],
    });

    const blob1 = await Packer.toBlob(doc1);

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph(`Renewable Energy Financing Instruments Trade Contract`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`This Trade Contract ("Contract") is entered into effective as of: ${formData.dealDate} ("Effective Date"), by and between the parties identified below.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 1 - Deal Initiated Date`),
            new Paragraph(``),
            new Paragraph(`This Contract is officially initiated and deemed effective as of ${formData.dealDate}. Both parties acknowledge that this date marks the commencement of their formal business relationship under this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 2 - Trade Contract Type`),
            new Paragraph(``),
            new Paragraph(`This is a ${formData.contract} type of contractual agreement.The Contract outlines the terms, conditions, obligations, and responsibilities associated with the sale and purchase of renewable energy financing instruments between the Seller and the Buyer.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 3 - Seller’s Details`),
            new Paragraph(``),
            new Paragraph(`Company Name: ${formData.seller}.`),
            new Paragraph(`The Seller, as identified above, is the official entity that agrees to provide the renewable energy financing instruments under the conditions laid out in this Contract.`),
            new Paragraph(`The Seller is represented by ${formData.sellerContact}, who is authorized to execute and deliver this Contract on behalf of the Seller.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 4 - Buyer’s Details`),
            new Paragraph(``),
            new Paragraph(`Company Name: ${formData.buyer}.`),
            new Paragraph(`The Buyer, as identified above, is the official entity that agrees to purchase the renewable energy financing instruments under the conditions specified in this Contract.`),
            new Paragraph(`The Buyer is represented by ${formData.buyerContact}, who is authorized to execute and deliver this Contract on behalf of the Buyer. `),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 5 - Product Type`),
            new Paragraph(``),
            new Paragraph(`The product subject to this Contract is ${formData.product}. The parties shall specify the type of renewable energy financing instrument in accordance with market standards and applicable laws.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 6 - Production Period`),
            new Paragraph(``),
            new Paragraph(`The production period for the renewable energy financing instruments is ${formData.productionPeriod}. This period is binding and represents the timeframe within which the product should be generated or otherwise produced.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 7 - Technology Related to the Financing Instrument`),
            new Paragraph(``),
            new Paragraph(`The renewable energy technology associated with the financing instrument is ${formData.technology}.  This will define the technological means by which the product is generated or produced, and may include specifications, models, or other relevant details.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 8 - Quantity (in MWs)`),
            new Paragraph(``),
            new Paragraph(`The total quantity of the product to be delivered under this Contract is ${formData.quantity} Megawatts. Both parties agree that any variation from this quantity must be mutually agreed upon in writing.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 9 - Delivery Date`),
            new Paragraph(``),
            new Paragraph(`The product will be delivered on ${formData.deliveryDate}.  Failure to adhere to this delivery date may result in penalties or other remedial measures as specified elsewhere in this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 10 - Price Per Product`),
            new Paragraph(``),
            new Paragraph(`The price per product is ${formData.currency} ${formData.pricePerProduct}.  This price is fixed and non-negotiable unless both parties agree to revise it through a formal amendment to this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 11 - Total Price`),
            new Paragraph(``),
            new Paragraph(`The total price for the quantity ordered is ${formData.currency} ${formData.totalPrice}. This total price includes all associated costs except for those explicitly mentioned otherwise in this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 12 - Payment Terms`),
            new Paragraph(``),
            new Paragraph(`The full amount will be paid within ${formData.paymentTerms} business days from the Delivery Date. Late payments may incur penalties as agreed upon by both parties.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 13 - VAT Payment Provisions`),
            new Paragraph(``),
            new Paragraph(`The value added tax (VAT) related to this Contract shall be: ${formData.vat}. Both parties are responsible for any obligations related to VAT as outlined by applicable laws and regulations. `),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 14 - Governing Law of the Contract`),
            new Paragraph(``),
            new Paragraph(`This Contract shall be governed by: ${formData.law}.  Any amendments to this Contract must also comply with the same governing law.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 15 - Jurisdiction and Arbitration`),
            new Paragraph(``),
            new Paragraph(`In the event of any disputes arising from this Contract, the parties agree to resolve such disputes through arbitration in ${formData.jurisdiction}. The arbitration process shall be governed by the rules of an arbitration entity mutually agreed upon by both parties.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`By signing below, both parties acknowledge that they have read and understand this Contract, and agree to be bound by its terms.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`For the Seller`),
            new Paragraph(``),
            new Paragraph(`Authorized Representative`),
            new Paragraph(``),
            new Paragraph(`_________________________`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`For the Buyer`),
            new Paragraph(``),
            new Paragraph(`Authorized Representative`),
            new Paragraph(``),
            new Paragraph(`_________________________`),
          ],
        },
      ],
    });

  const url1 = URL.createObjectURL(blob1);
  const a1 = document.createElement('a');
  a1.href = url1;
  a1.download = 'trade_confirmation.docx';
  a1.click();

Packer.toBlob(doc).then(blob => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contract.docx';
  a.click();
});

const blob = await Packer.toBlob(doc);

localStorage.setItem("appendix", blob);
localStorage.setItem("appendix1", blob1);
  };

const [specialRequest, setSpecialRequest] = useState(false);

const handleCheckboxChange = (e) => {
  setSpecialRequest(e.target.checked);
};

const handleSendRequest = async () => {
  if (specialRequest) {
    // Simulate sending an email to legal team
    console.log('Sending special request to legal team...');
    alert('Sending special request to legal team...');

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph(`Renewable Energy Financing Instruments Trade Contract`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`This Trade Contract ("Contract") is entered into effective as of: ${formData.dealDate} ("Effective Date"), by and between the parties identified below.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 1 - Deal Initiated Date`),
            new Paragraph(``),
            new Paragraph(`This Contract is officially initiated and deemed effective as of ${formData.dealDate}. Both parties acknowledge that this date marks the commencement of their formal business relationship under this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 2 - Trade Contract Type`),
            new Paragraph(``),
            new Paragraph(`This is a ${formData.contract} type of contractual agreement.The Contract outlines the terms, conditions, obligations, and responsibilities associated with the sale and purchase of renewable energy financing instruments between the Seller and the Buyer.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 3 - Seller’s Details`),
            new Paragraph(``),
            new Paragraph(`Company Name: ${formData.seller}.`),
            new Paragraph(`The Seller, as identified above, is the official entity that agrees to provide the renewable energy financing instruments under the conditions laid out in this Contract.`),
            new Paragraph(`The Seller is represented by ${formData.sellerContact}, who is authorized to execute and deliver this Contract on behalf of the Seller.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 4 - Buyer’s Details`),
            new Paragraph(``),
            new Paragraph(`Company Name: ${formData.buyer}.`),
            new Paragraph(`The Buyer, as identified above, is the official entity that agrees to purchase the renewable energy financing instruments under the conditions specified in this Contract.`),
            new Paragraph(`The Buyer is represented by ${formData.buyerContact}, who is authorized to execute and deliver this Contract on behalf of the Buyer. `),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 5 - Product Type`),
            new Paragraph(``),
            new Paragraph(`The product subject to this Contract is ${formData.product}. The parties shall specify the type of renewable energy financing instrument in accordance with market standards and applicable laws.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 6 - Production Period`),
            new Paragraph(``),
            new Paragraph(`The production period for the renewable energy financing instruments is ${formData.productionPeriod}. This period is binding and represents the timeframe within which the product should be generated or otherwise produced.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 7 - Technology Related to the Financing Instrument`),
            new Paragraph(``),
            new Paragraph(`The renewable energy technology associated with the financing instrument is ${formData.technology}.  This will define the technological means by which the product is generated or produced, and may include specifications, models, or other relevant details.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 8 - Quantity (in MWs)`),
            new Paragraph(``),
            new Paragraph(`The total quantity of the product to be delivered under this Contract is ${formData.quantity} Megawatts. Both parties agree that any variation from this quantity must be mutually agreed upon in writing.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 9 - Delivery Date`),
            new Paragraph(``),
            new Paragraph(`The product will be delivered on ${formData.deliveryDate}.  Failure to adhere to this delivery date may result in penalties or other remedial measures as specified elsewhere in this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 10 - Price Per Product`),
            new Paragraph(``),
            new Paragraph(`The price per product is ${formData.currency} ${formData.pricePerProduct}.  This price is fixed and non-negotiable unless both parties agree to revise it through a formal amendment to this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 11 - Total Price`),
            new Paragraph(``),
            new Paragraph(`The total price for the quantity ordered is ${formData.currency} ${formData.totalPrice}. This total price includes all associated costs except for those explicitly mentioned otherwise in this Contract.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 12 - Payment Terms`),
            new Paragraph(``),
            new Paragraph(`The full amount will be paid within ${formData.paymentTerms} business days from the Delivery Date. Late payments may incur penalties as agreed upon by both parties.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 13 - VAT Payment Provisions`),
            new Paragraph(``),
            new Paragraph(`The value added tax (VAT) related to this Contract shall be: ${formData.vat}. Both parties are responsible for any obligations related to VAT as outlined by applicable laws and regulations. `),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 14 - Governing Law of the Contract`),
            new Paragraph(``),
            new Paragraph(`This Contract shall be governed by: ${formData.law}.  Any amendments to this Contract must also comply with the same governing law.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Clause 15 - Jurisdiction and Arbitration`),
            new Paragraph(``),
            new Paragraph(`In the event of any disputes arising from this Contract, the parties agree to resolve such disputes through arbitration in ${formData.jurisdiction}. The arbitration process shall be governed by the rules of an arbitration entity mutually agreed upon by both parties.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`By signing below, both parties acknowledge that they have read and understand this Contract, and agree to be bound by its terms.`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`For the Seller`),
            new Paragraph(``),
            new Paragraph(`Authorized Representative`),
            new Paragraph(``),
            new Paragraph(`_________________________`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`For the Buyer`),
            new Paragraph(``),
            new Paragraph(`Authorized Representative`),
            new Paragraph(``),
            new Paragraph(`_________________________`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`Appendix to the Contract - Special legal request:`),
            new Paragraph(``),
            new Paragraph(``),
            new Paragraph(`${reviewComments}`),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract_needsReview.docx';
    a.click();

    // Clear the blob URL
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }
};
const handleReviewCommentsChange = (e) => {
  setReviewComments(e.target.value);
};

return (
  <div className="form-container">
    <h1 className='form-title'>Create Trade Confirmation and Contract</h1>
    <p className='form-decription'>Please fill out the details to generate a new contract.</p>
    <form className="ux-form" onSubmit={handleSubmit}>
      <label>
        Deal Date:
        <input
          type="date"
          name="dealDate"
          value={formData.dealDate}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Contract:
        <input
          type="text"
          name="contract"
          value={formData.contract}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Seller:
        <input
          type="text"
          name="seller"
          placeholder='Energy company'
          value={formData.seller}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Seller Contact:
        <input
          type="text"
          name="sellerContact"
          placeholder='Mr.Jansen'
          value={formData.sellerContact}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Buyer:
        <input
          type="text"
          name="buyer"
          value={formData.buyer}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Buyer Contact:
        <input
          type="text"
          name="buyerContact"
          value={formData.buyerContact}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Product:
        <input
          type="text"
          name="product"
          placeholder='NL Solar GVO'
          value={formData.product}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Production Period:
        <input
          type="text"
          name="productionPeriod"
          value={formData.productionPeriod}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Technology:
        <input
          type="text"
          name="technology"
          placeholder='Solar'
          value={formData.technology}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Delivery Date:
        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Price Per Product:
        <input
          type="number"
          name="pricePerProduct"
          min="1"
          max="10"
          placeholder='1 - 10 euro / MWH'
          value={formData.pricePerProduct}
          onChange={handleInputChange}
          style={{ width: '160px' }}
          required
        />
      </label>

      <label>
        Total Price:
        <input
          type="text"
          name="totalPrice"
          value={formData.totalPrice}
          readOnly
        />
      </label>

      <label>
        Currency:
        <input
          type="text"
          name="Currency"
          value={formData.currency}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Payment Terms: Full amount will be paid within
        <input
          type="text"
          name="paymentTerms"
          placeholder='fifteen (15)'
          value={formData.paymentTerms}
          onChange={handleInputChange}
          style={{ width: '100px' }}
          required
        />
        business days
      </label>

      <label>
        VAT:
        <input
          type="text"
          name="Vat"
          value={formData.vat}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Applicable Law:
        <input
          type="text"
          name="law"
          value={formData.law}
          onChange={handleInputChange}
          style={{ width: '100px' }}
          required
        />
      </label>

      <label>
        Competent Forum / Jurisdiction:
        <input
          type="text"
          name="jurisdiction"
          value={formData.jurisdiction}
          onChange={handleInputChange}
          style={{ width: '325px' }}
          required
        />
      </label>

      <label>
        Special Legal Request:
        <input
          type="checkbox"
          checked={specialRequest}
          onChange={handleCheckboxChange}
        />
      </label>

      {specialRequest && (
        <label>
          Appendix - Special legal request:
          <textarea
            rows="4"
            cols="50"
            value={reviewComments}
            onChange={handleReviewCommentsChange}
          >
          </textarea>
        </label>
      )}

      <button className='form-button' type="button" onClick={handleSendRequest} disabled={!specialRequest}>
        Send Request
      </button>

      <button className='form-button' type="submit">Submit</button>
    </form>
  </div>
);
}

export default ContractForm;
