import nodeMailr from "nodemailer"

const senMail = async (adres: string, content: string) => {
  const transport = nodeMailr.createTransport({
    service: "gmail",
    auth: {
      user: "karzinkawebsite@gmail.com",
      pass: "jxhpfbsrewpjkcri",
    },
  })

  await transport.sendMail({
    from: "karzinkawebsite@gmail.com",
    to: adres,
    subject: content,
    text: content,
  })

  return content
}

export default senMail
