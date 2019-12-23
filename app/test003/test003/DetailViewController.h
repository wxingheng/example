//
//  DetailViewController.h
//  test003
//
//  Created by wuxingheng on 2019/12/10.
//  Copyright © 2019 wuxingheng. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController

@property (strong, nonatomic) NSDate *detailItem;
@property (weak, nonatomic) IBOutlet UILabel *detailDescriptionLabel;

@end

