const Core = require('@alicloud/pop-core');
const querystring = require('querystring');
const http = require('http');

// regionId
const regionId = "cn-hangzhou"
// accessKeyId
const accessKeyId = ""
// accessSecret
const accessSecret = ""
// 域名
const domainName = ""
// 主机记录 e.g ["www", "@"]
const rr = []

const client = new Core({
  accessKeyId: accessKeyId,
  accessKeySecret: accessSecret,
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
});

const requestOption = {
  method: 'POST'
};

const getDescribeDomainRecords = (_domainName) => {
  const params = {
    "RegionId": regionId,
    "DomainName": _domainName,
    "PageNumber": "1",
    "PageSize": "10"
  }

  return new Promise((resolve, reject) => {
    client.request('DescribeDomainRecords', params, requestOption).then((result) => {
      const records = result.DomainRecords.Record;
      resolve(records.filter(({ RR }) => rr.includes(RR)));
    }, (ex) => {
      reject(ex);
    })
  })
}

const updateDomainRecord = (record) => {
  const params = {
    "RegionId": regionId,
    "RecordId": record.RecordId,
    "RR": record.RR,
    "Type": record.Type,
    "Value": record.Value
  }

  return new Promise((resolve, reject) => {
    client.request('UpdateDomainRecord', params, requestOption).then((result) => {
      resolve();
    }, (ex) => {
      reject(ex);
    })
  })
}

const getMyIp = () => {
  let options = {
    hostname: "ip.taobao.com",
    port: 80,
    path: "/outGetIpInfo",
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "http://ip.taobao.com",
      "Referer": "http://ip.taobao.com/"
    }
  }
  const params = {ip: "myip", accessKey: "alibaba-inc"};
  return new Promise((resolve, reject) => {
    let req = http.request(options, (res) => {
      res.setEncoding("utf-8");
      if (res.statusCode === 200) {
        res.on("data", (data) => {
          const res = JSON.parse(data);
          resolve(res.data.queryIp);
        });
      } else {
        reject(res.statusCode);
      }
    });
    req.on("error", (err) => {
      reject(err.message);
    });
    req.write(querystring.stringify(params));
    req.end();
  })
}

const main = async () => {
  let ip = await getMyIp();
  let records = await getDescribeDomainRecords(domainName);
  if (records.length) {
    console.log("Record changed, start updating……");
    const task = records.reduce((task, record) => {
      if (record.Value !== ip) {
        record.Type = "A";
        record.Value = ip;
        task.push(updateDomainRecord(record))
      }
      return task
    }, [])
    // update all match
    Promise.all(task).then(res => {
      res.forEach((v, i) => {
        console.log("Record named " + records[i].RR + " updates to '" + ip + "'.");
      })
    }).catch((err) => {
      console.log(err);
      console.log("Update failed.");
    })
  } else {
    console.log("No record matches");
  }
}

main();


