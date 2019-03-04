//
//  WidgetView.swift
//  AppTP4
//
//  Created by Jean-Charles Moussé on 13/02/2019.
//  Copyright © 2019 Jean-Charles Moussé. All rights reserved.
//

import UIKit

class WidgetView: UIView {
    
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var leftSelection: UIButton!
    @IBOutlet weak var rightSelection: UIButton!
    
    var delegate: WidgetDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        widgetInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        widgetInit()
    }
    
    private func widgetInit() {
        Bundle.main.loadNibNamed("WidgetView", owner: self, options: nil)
        addSubview(contentView)
        contentView.frame = self.bounds
        contentView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
    }
    
    @IBAction func onLeftPressed(_ sender: UIButton) {
        delegate?.leftHaveBeenSelected()
    }
    
    @IBAction func onRightPressed(_ sender: UIButton) {
        delegate?.rightHaveBeenSelected()
    }
}
