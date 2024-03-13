export const createMessage = async (token: string, channelId: string, message: string) => {
    // post message to slack
    const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            channel: channelId,
            text: message
        })
    })
    const data:any = await response.json()
    console.log(data)
    return data
}


export const recordStart = async (projectName: string) => {
    const token = process.env.SLACK_API_TOKEN
    const channelId = process.env.SLACK_CHANNEL_ID
    const message = `稼働開始: ${projectName}`
    await createMessage(token, channelId, message)
}

export const recordStop = async (projectName: string) => {
    const token = process.env.SLACK_API_TOKEN
    const channelId = process.env.SLACK_CHANNEL_ID
    const message = `稼働終了: ${projectName}`
    await createMessage(token, channelId, message)
}
