import UIKit

protocol DownloadDelegate {
    func didFinishDownloadWithSuccess()
    
    func didFinishDownloadWithError()
}

class DownloadManager {
    var delegate: DownloadDelegate?
    
    func download(url: String) {
        if url.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            delegate?.didFinishDownloadWithError()
        } else {
            delegate?.didFinishDownloadWithSuccess()
        }
    }
}

class DatasViewController : DownloadDelegate {
    var downloadManager = DownloadManager()
    
    init() {
        self.downloadManager.delegate = self
        self.downloadManager.download(url: "UrlNotEmpty")
        self.downloadManager.download(url: "") // Empty Url
        self.downloadManager.download(url: "    \n") // Empty Url
    }
    
    func didFinishDownloadWithSuccess() {
        print("Download finish with success")
    }
    
    func didFinishDownloadWithError() {
        print("Download finish with error :/")
    }
}

DatasViewController()
