import * as rp from 'request-promise'

const baseAddress = "1JnGQ45UE7tbFYkMg16bTm3jVJYv5YqVWW"
const baseHandle = "_MattHill_"

export interface Message {
  twitterHandle: string;
  content: string;
  date: Date;
  txid: string;
}

const messages: Message[] = [
  {
    twitterHandle: "asdfads",
    content: "this is a test",
    date: new Date(),
    txid: "deadbeef"
  }
];

interface Bork {
  txid: string
  createdAt: Date
  content: string
  extensionsCount: number
}

export async function getMessages(page: number = 0, perPage: number = 20): Promise<Message[]> {
  const res: Bork[] = await rp.get("https://bitwish.start9labs.com:11020/borks", {
    json: true,
    headers: { 'my-address': baseAddress },
    qs: {
      senderAddress: baseAddress,
      types: ['bork'],
      page,
      perPage,
    }
  })

  return res.map(b => {
    let twitterHandle = baseHandle
    if (b.content.startsWith("@")) {
      twitterHandle = b.content?.split(":")[0].substr(1)
    }
    if (b.extensionsCount > 0) {
      b.content += "..."
    }
    return {
      twitterHandle,
      content: b.content,
      date: new Date(b.createdAt),
      txid: b.txid
    }
  })
}

export async function getMessage(txid: string): Promise<Message> {
  const res: Bork = await rp.get(`https://bitwish.start9labs.com:11020/borks/${txid}`, {
    json: true,
    headers: { 'my-address': baseAddress }
  })

  let twitterHandle = baseHandle
  if (res.content.startsWith("@")) {
    twitterHandle = res.content?.split(":")[0].substr(1)
  }
  return {
    twitterHandle,
    content: res.content,
    date: new Date(res.createdAt),
    txid: res.txid
  }
}
