<template>
  <div class="layout">
      <header-history :path="'#/apply'"></header-history>
       <div class="default-layout">
                <group title="用血者信息">
                    <x-input title="姓名" disabled required v-model="userbase.name" :max="10" name="username" placeholder="请输入姓名"></x-input>
                    <selector required v-model="userbase.gender"  title="性别" :options="[{
              key: '1',
              value: '男'
            },
            {
              key: '2',
              value: '女'
            },
            {
              key: '0',
              value: '未知'
            },
            {
              key: '9',
              value: '未说明性别'
            }
          ]" ></selector>
                    <x-number title="年龄" width="80px" :min="0" :max="120" fillable required v-model="userbase.age" name="age" placeholder="请输入年龄"></x-number>
                    <x-input title="证件类型" disabled   :value="identityTypeView"></x-input>
                    <!-- <selector required v-model="userbase.identityType" disabled  title="证件类型" :options="identityTypeList" ></selector> -->
                    <x-input title="证件号码" :is-type="validate" required v-model="userbase.idNumber" name="idNumber" placeholder="请输入证件号码"></x-input>
                    <x-input title="手机号" :is-type="validatePhone" required v-model="userbase.phone" name="phone" placeholder="请输入手机号"></x-input>
                    <uploader
                      :preview="preview"
                      :max="varmax"
                      :images="userbase.images"
                      :upload-url="uploadUrl"
                      name="file"
                      :title="'身份证件照片'"
                      :describe="'依次选择身份证姓名面，国徽面'"
                    ></uploader>
                 </group>
                 <group v-show="userbase.caseType !== '5'" :title="userbase.caseType === '2' ? '家庭成员献血信息' : '献血信息'">
                    <x-input :max="30" v-show="userbase.caseType === '2'" title="姓名" required v-model="userbase.familyName" name="username" placeholder="请输入姓名"></x-input>
                    <selector v-show="userbase.caseType === '2'" required v-model="userbase.familyType"  title="证件类型" :options="identityTypeList" ></selector>
                    <x-input :max="30" v-show="userbase.caseType === '2'" title="证件号码" :is-type="familyValidate" required v-model="userbase.familyNumber" placeholder="请输入证件号码"></x-input>
                    <selector v-show="userbase.caseType === '2'" required v-model="userbase.relation"  title="与献血者关系" :options="[{key: 'LOCAL', value: '本地',}, {key: '1', value: '父母'}, {key: '2', value: '子女'}, {key: '3', value: '岳父母'}, {key: '4', value: '公婆'}, {key: '5', value: '配偶'}]" ></selector>
                    <selector v-show="userbase.caseType !== '2'" required v-model="userbase.placeType"  title="献血地点" :options="[{key: 'LOCAL', value: '本地',}, {key: 'NONLOCAL', value: '外地',}, {key: 'NEVER', value: '无',}]" ></selector>
                    <x-number v-show="userbase.caseType !== '2'" title="献血次数" width="80px" :min="0" :max="1000" fillable required v-model="userbase.count" name="count" placeholder="请输入献血次数"></x-number>
                    <datetime
                        v-model="userbase.donateTime"
                        :title="'最近献血时间'"
                        :min-year="1950"
                        :max-year="new Date().getFullYear()"
                    ></datetime>
                    <selector required v-model="userbase.donateType"
                     title="献血类型" :options="[{key: 'WHOL', value: '全血'}, { key: 'APHE', value: '单采血小板'}]" ></selector>
                     <uploader
                     v-show="userbase.caseType === '2'"
                      :max="varmax"
                      :images="userbase.prove4"
                      :upload-url="uploadUrl"
                      name="file"
                      :title="'关系证明'"
                      :describe="'请上传献血者与用血的关系证明，如结婚证、出生证、户口本、公安机关开具的正规关系'"
                    ></uploader>
                    <uploader
                    v-show="userbase.caseType === '2'"
                      :max="varmax"
                      :images="userbase.prove5"
                      :upload-url="uploadUrl"
                      name="file"
                      :title="'献血者身份证明'"
                      :describe="' 依次选择身份证姓名面，国徽面'"
                    ></uploader>
                     <uploader
                      :max="varmax"
                      :images="userbase.prove1"
                      :upload-url="uploadUrl"
                      name="file"
                      :title="'献血证明'"
                      :describe="'请上传一张最近一次的献血证，要求上传献血者信息详情页、献血记录页、用血记录页'"
                    ></uploader>
                 </group>
                  <group title="用血信息">
                      <x-input title="用血医院"
                      required
                      :max="30"
                      name="hospital"
                      placeholder="请搜索医院"
                      @on-keyup="hospitalChange"
                      v-model="userbase.hospital.name"
                      ></x-input>
                      <div class="weui-cells vux-search_show" v-show="hospitals.length > 0" style="position: absolute;
                          margin-top: 0px;
                          max-height: 200px;
                          overflow-y: auto;
                          z-index: 5000;
                          width: 100%;">
                        <div class="weui-cell weui-cell_access" v-for="item in hospitals" :key="item.id">
                          <div class="weui-cell__bd weui-cell_primary" @click="selectHospital(item)">
                            <p>{{item.name}} </p>
                          </div>
                        </div>
                      </div>
                      <x-input title="医院所在区"
                      disabled
                      :max="30"
                      v-model="userbase.hospital.areaName"
                      ></x-input>
                      <selector required v-model="userbase.diagnosis"  title="临床诊断" :options="disease"></selector>
                      <x-input title="其它诊断" v-show="userbase.diagnosis == '40'"
                      :max="30"
                      v-model="userbase.otherDiseaseName"
                      placeholder="请输入临床诊断信息"
                      ></x-input>
                      <selector required   title="用血品种"  ref="bloodType" :options="bloodSubTypes"></selector>
                    <x-input title="用血量（U）" :min="0" :max="3"  ref="bloodCount" fillable placeholder="请输入" type="number">
                        <x-button slot="right" type="primary" mini @click.native="addBlood()">添加</x-button>
                    </x-input>
                    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                      <thead>
                        <tr style="background-color: #fff">
                          <th>用血品种</th>
                          <th>用血量</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) in userbase.evidenceBloods" :key="item.bloodSubType">
                          <td>{{item.name}}</td>
                          <td>{{item.volume}} {{item.unit}}</td>
                          <td><icon type="cancel" @click.native="deleteBlood(i)"></icon></td>
                        </tr>
                      </tbody>
                    </x-table>
                     <uploader
                      :max="varmax"
                      :images="userbase.prove2"
                      :upload-url="uploadUrl"
                      name="file"
                      :title="'用血通知书'"
                      :describe="'请上传用血通知书页面，并根据医生填写的用血类型与用血量仔细填写用血情况'"
                    ></uploader>

                  </group>
                  <group v-show="userbase.caseType==='1' || userbase.caseType==='2' || userbase.caseType==='6' || userbase.caseType==='5'" :title="userbase.caseType === '6' ? '本市全日制高校' : '用血者工作情况'">
                      <div class="box">
                        <checker v-model="userbase.inauguralStatus"
                        default-item-class="inauguralStatus-item"
                         selected-item-class="inauguralStatus-item-selected"
                         @on-change="inauguralStatusChange()"
                         >
                          <checker-item :value="item" v-for="(item, index) in (userbase.caseType === '6' ? [
                            {key: 'ETC1', value: '在校教师'},
                            {key: 'ETC2', value: '在校学生'},
                          ]: [
                            {key: 'WORK', value: '本市有工作单位'},
                            {key: 'UMEM', value: '本市无工作单位'},
                            {key: 'RETI', value: '本市退休职工'},
                            {key: 'DOCT', value: '外省市来沪就医'},
                          ])" :key="index">{{item.value}}</checker-item>
                        </checker>
                      </div>
                       <x-input v-show="userbase.inauguralStatus.key === 'RETI'"
                        :title="'退休单位名称'"
                        :max="30"
                        required
                        placeholder="请输入退休单位"
                        v-model="userbase.retireEmploymentName"
                      ></x-input>
                       <x-input v-show="userbase.inauguralStatus.key === 'WORK' || userbase.inauguralStatus.key === 'ETC1' || userbase.inauguralStatus.key === 'ETC2'"
                        :title="userbase.inauguralStatus.key === 'WORK' ? '单位名称' :( userbase.inauguralStatus.key === 'ETC1' ||  userbase.inauguralStatus.key === 'ETC2') ? '高校名称' :'退休单位名称'"
                        required
                        :max="30"
                        placeholder="请搜索"
                        @on-keyup="employmentChange"
                        v-model="userbase.employment.name"
                      ></x-input>
                      <div class="weui-cells vux-search_show" v-show="employments.length > 0" style="position: absolute;
                          margin-top: 0px;
                          max-height: 200px;
                          overflow-y: auto;
                          z-index: 5000;
                          width: 100%;">
                        <div class="weui-cell weui-cell_access" v-for="item in employments" :key="item.id">
                          <div class="weui-cell__bd weui-cell_primary" @click="selectemployment(item)">
                            <p>{{item.name}} </p>
                          </div>
                        </div>
                      </div>
                     <selector required v-model="userbase.employmentArea"
                     v-show="userbase.inauguralStatus.key !== 'DOCT' && userbase.inauguralStatus.key !== 'ETC1' && userbase.inauguralStatus.key !== 'ETC2'"
                     :title="userbase.inauguralStatus.key === 'WORK' ? '缴纳社保区' : userbase.inauguralStatus.key === 'UMEM' ? '户籍所在区': '退休单位所在区'"
                      :options="areas" ></selector>
                      <uploader
                      v-show="userbase.inauguralStatus.key !== 'DOCT'"
                      :max="varmax"
                      :images="userbase.prove3"
                      :upload-url="uploadUrl"
                      name="file"
                     :title="userbase.inauguralStatus.key === 'WORK' ? '相关材料' : userbase.inauguralStatus.key === 'UMEM' ? '户口本和无业证明': (userbase.inauguralStatus.key === 'ETC1') ? '工作证' : (userbase.inauguralStatus.key === 'ETC2') ? '学生证' :'相关材料'"
                      :describe="userbase.inauguralStatus.key === 'WORK' ? '请填写单位全称，并咨询单位人事确认您单位社保缴纳所在区' : userbase.inauguralStatus.key === 'UMEM' ? '请上传您的无业证明，如劳动手册等': '单位退休则选择单位缴纳社保所在区，街道退休则选择街道所在区'"
                    ></uploader>

                  </group>
                 <div style="padding:15px 0;">
                            <label>
                                <input type="checkbox" required v-model="userbase.agree" value="checkbox" checked="true">
                                本人承诺以上资料均属实
                            </label>
                 <x-button @click.native="submit()" type="primary" :disabled="disabled">我要申请</x-button>
            </div>
       </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import isIdentity from "../utils/validate.js";
import model from "../model/client-model";

// 本地组件
import uploader from "../components/uploader.vue";
// 使用自己远程的组件库
// import uploader from "vux-uploads";

Array.prototype.findIndex =
  Array.prototype.findIndex ||
  function(evaluator, thisArg) {
    "use strict";
    if (!this) {
      throw new TypeError("Array.prototype.some called on null or undefined");
    }

    if (typeof evaluator !== "function") {
      if (typeof evaluator === "string") {
        // 尝试将其转换为函数
        if (!(evaluator = eval(evaluator))) {
          throw new TypeError();
        }
      } else {
        throw new TypeError();
      }
    }

    var i;
    if (thisArg === undefined) {
      // 为 thisArg 优化
      for (i in this) {
        if (evaluator(this[i], i, this)) {
          return i;
        }
      }
      return -1;
    }
    for (i in this) {
      if (evaluator.call(thisArg, this[i], i, this)) {
        return i;
      }
    }
    return -1;
  };

export default {
  name: "Application",
  components: {
    uploader
  },
  data() {
    return {
      msg: "Application",
      userbase: {
        ...this.$store.state.userbase,
        placeType: "LOCAL",
        count: 1,
        donateTime: "2018-01-01",
        donateType: "WHOL",
        images: [], // 本人证明
        prove1: [], // 献血证明
        prove2: [], // 用血通知书
        prove3: [], // 工作情况
        hospital: {},
        diagnosis: "40",
        evidenceBloods: [],
        otherDiseaseName: "", // 其它诊断
        caseType: "",
        inauguralStatus:
          this.$route.params.caseType === "6"
            ? { key: "ETC1", value: "在校教师" }
            : { key: "WORK", value: "本市有工作单位" },
        //  (() => {
        //   if(this.userbase.caseType === '6'){
        //   return { key: "ETC1", value: "在校学生" }
        //   }else{
        //   return { key: "WORK", value: "本市有工作单位" }
        //   }
        // })(), // 用血者工作情况
        employment: {}, // 单位
        employmentArea: "", // 单位所在区ID
        retireEmploymentName: "", // 单位名称

        // 家庭成员相关信息
        familyName: "",
        familyType: "",
        familyNumber: "",
        relation: "",
        prove4: [], // 关系证明
        prove5: [] // 献血者身份证明
        // 家庭成员相关信息
      },
      hospitals: [], // 医院模糊查询
      employments: [], // 单位模糊查询
      areas: [], // 地区
      show: false,
      validate: value => {
        // valid  false  不通过
        let result = true;
        if (
          this.userbase.identityType === "01" &&
          !isIdentity.isIdentity(value)
        ) {
          result = false;
        }
        return {
          valid: result,
          msg: "Error"
        };
      },
      familyValidate: value => {
        // valid  false  不通过
        let result = true;
        if (
          this.userbase.familyType === "01" &&
          !isIdentity.isIdentity(value)
        ) {
          result = false;
        }
        return {
          valid: result,
          msg: "Error"
        };
      },
      validatePhone: function(value) {
        const result = isIdentity.checkTel(value);
        return {
          valid: result,
          msg: "Error"
        };
      },
      fillable: true,
      varmax: 5,
      uploadUrl:
      "/api/service/wechatevidence/upload",
        // "https://sbc.stpass.com/api/service/wechatevidence/upload",
      disease: [],
      bloodSubTypes: []
    };
  },
  computed: {
    identityTypeList: function() {
      if (this.$store.state.identityTypeList.length <= 0) {
        this.getIdentityType();
      }
      return this.$store.state.identityTypeList.map(d => {
        d.key = d.id;
        d.value = d.name;
        return d;
      });
    },
    identityTypeView: function() {
      console.log(this.identityTypeList);
      if (this.identityTypeList.length > 0) {
        return this.identityTypeList.filter(
          d => d.id == this.userbase.identityType
        )[0]["name"];
      } else {
        return "";
      }
    },
    disabled: function() {
      let result = false;
      switch (this.userbase.caseType) {
        case "3":
        case "4":
        case "8":
          if (
            !this.userbase.name ||
            !this.userbase.age ||
            !this.userbase.idNumber ||
            !this.userbase.phone ||
            !this.userbase.images.length ||
            !this.userbase.placeType ||
            !this.userbase.donateType ||
            !this.userbase.prove1.length ||
            !this.userbase.hospital ||
            !this.userbase.diagnosis ||
            !this.userbase.evidenceBloods.length ||
            !this.userbase.prove2.length ||
            !this.userbase.agree ||
            (this.userbase.diagnosis == "40" && !this.userbase.otherDiseaseName)
          ) {
            result = true;
          }
          break;
        case "1":
          if (
            !this.userbase.name ||
            !this.userbase.age ||
            !this.userbase.idNumber ||
            !this.userbase.phone ||
            !this.userbase.images.length ||
            !this.userbase.placeType ||
            !this.userbase.donateType ||
            !this.userbase.prove1.length ||
            !this.userbase.hospital ||
            !this.userbase.diagnosis ||
            !this.userbase.evidenceBloods.length ||
            !this.userbase.prove2.length ||
            !this.userbase.agree ||
            (this.userbase.inauguralStatus.key === "WORK" &&
              !this.userbase.employment.id) ||
            (this.userbase.inauguralStatus.key !== "DOCT" &&
              !this.userbase.employmentArea) ||
            (this.userbase.inauguralStatus.key === "RETI" &&
              !this.userbase.retireEmploymentName) ||
            (this.userbase.inauguralStatus.key !== "DOCT" &&
              !this.userbase.prove3.length) ||
            (this.userbase.diagnosis == "40" && !this.userbase.otherDiseaseName)
          ) {
            result = true;
          }
          break;
        case "2":
          if (
            !this.userbase.name ||
            !this.userbase.age ||
            !this.userbase.idNumber ||
            !this.userbase.phone ||
            !this.userbase.images.length ||
            // 家庭成员献血不需要献血地点 献血次数
            // 新增   家庭成员献血信息
            !this.userbase.familyName ||
            !this.userbase.familyType ||
            !this.userbase.familyNumber ||
            !this.userbase.relation ||
            !this.userbase.prove4.length ||
            !this.userbase.prove5.length ||
            // 新增   家庭成员献血信息
            // !this.userbase.placeType ||
            !this.userbase.donateType ||
            !this.userbase.prove1.length ||
            !this.userbase.hospital ||
            !this.userbase.diagnosis ||
            !this.userbase.evidenceBloods.length ||
            !this.userbase.prove2.length ||
            !this.userbase.agree ||
            (this.userbase.diagnosis == "40" &&
              !this.userbase.otherDiseaseName) ||
            (this.userbase.inauguralStatus.key === "WORK" &&
              !this.userbase.employment.id) ||
            (this.userbase.inauguralStatus.key !== "DOCT" &&
              !this.userbase.employmentArea) ||
            (this.userbase.inauguralStatus.key === "RETI" &&
              !this.userbase.retireEmploymentName) ||
            (this.userbase.inauguralStatus.key !== "DOCT" &&
              !this.userbase.prove3.length)
          ) {
            result = true;
          }
          break;
        case "6":
          if (
            !this.userbase.name ||
            !this.userbase.age ||
            !this.userbase.idNumber ||
            !this.userbase.phone ||
            !this.userbase.images.length ||
            !this.userbase.placeType ||
            !this.userbase.donateType ||
            !this.userbase.prove1.length ||
            !this.userbase.hospital ||
            !this.userbase.diagnosis ||
            !this.userbase.evidenceBloods.length ||
            !this.userbase.prove2.length ||
            !this.userbase.agree ||
            !this.userbase.employment.id ||
            !this.userbase.prove3.length ||
            (this.userbase.diagnosis == "40" && !this.userbase.otherDiseaseName)
          ) {
            result = true;
          }
          break;
        case "5":
          if (
            !this.userbase.name ||
            !this.userbase.age ||
            !this.userbase.idNumber ||
            !this.userbase.phone ||
            !this.userbase.images.length ||
            // !this.userbase.placeType ||
            // !this.userbase.donateType ||
            // !this.userbase.prove1.length ||
            !this.userbase.hospital ||
            !this.userbase.diagnosis ||
            !this.userbase.evidenceBloods.length ||
            !this.userbase.prove2.length ||
            !this.userbase.agree ||
            (this.userbase.diagnosis == "40" &&
              !this.userbase.otherDiseaseName) ||
            (this.userbase.inauguralStatus.key === "WORK" &&
              !this.userbase.employment.id) ||
            (this.userbase.inauguralStatus.key !== "DOCT" &&
              !this.userbase.employmentArea) ||
            (this.userbase.inauguralStatus.key === "RETI" &&
              !this.userbase.retireEmploymentName) ||
            (this.userbase.inauguralStatus.key !== "DOCT" &&
              !this.userbase.prove3.length)
          ) {
            result = true;
          }
          break;
      }
      return result;
    }
  },
  methods: {
    ...mapActions(["getIdentityType", "updateUserbase"]),
    submit: function() {
      let postData = {};
      switch (this.userbase.caseType) {
        case "3":
        case "4":
        case "8":
          postData = {
            age: this.userbase.age.toString(),
            caseType: this.userbase.caseType,
            contact: this.userbase.phone,
            disease: this.userbase.diagnosis,
            donateNum: parseFloat(this.userbase.count).toFixed(2),
            donateTime: this.userbase.donateTime + " 00:00:00",
            donateType: this.userbase.donateType,
            evidenceBloods: this.userbase.evidenceBloods.map(d => {
              return {
                bloodSubType: d.bloodSubType.toString(),
                unit: d.unit,
                volume: parseFloat(d.volume).toFixed(2)
              };
            }),
            evidenceStuffs: [
              {
                name: "身份证明",
                matterId: this.userbase.images.map(d => d.id).toString()
              },
              {
                name: "用血通知单",
                matterId: this.userbase.prove2.map(d => d.id).toString()
              },
              {
                type: "1",
                matterId: this.userbase.prove1.map(d => d.id).toString()
              }
            ],
            evidenceType: "WEI",
            gender: this.userbase.gender,
            hospitalName: this.userbase.hospital.name,
            identityId: this.userbase.idNumber,
            identityType: this.userbase.identityType,
            isOtherDisease: 0,
            name: this.userbase.name,
            otherDiseaseName: this.userbase.otherDiseaseName,
            placeType: this.userbase.placeType
          };
          break;
        case "1":
          postData = {
            age: this.userbase.age.toString(),
            caseType: this.userbase.caseType,
            contact: this.userbase.phone,
            disease: this.userbase.diagnosis,
            donateNum: this.userbase.count.toString() + ".00",
            donateTime: this.userbase.donateTime + " 00:00:00",
            donateType: this.userbase.donateType,
            employment:
              this.userbase.inauguralStatus.key === "WORK"
                ? this.userbase.employment.id
                : null, // 单位
            employmentArea:
              this.userbase.inauguralStatus.key === "DOCT"
                ? null
                : this.userbase.employmentArea, // 单位所在区
            evidenceBloods: this.userbase.evidenceBloods.map(d => {
              return {
                bloodSubType: d.bloodSubType.toString(),
                unit: d.unit,
                volume: d.volume
              };
            }),
            evidenceStuffs: [
              {
                name: "身份证明",
                matterId: this.userbase.images.map(d => d.id).toString()
              },
              {
                name: "用血通知单",
                matterId: this.userbase.prove2.map(d => d.id).toString()
              },
              {
                type: "1",
                matterId: this.userbase.prove1.map(d => d.id).toString()
              }
            ],
            evidenceType: "WEI",
            gender: this.userbase.gender,
            hospitalName: this.userbase.hospital.name,
            identityId: this.userbase.idNumber,
            inauguralStatus: this.userbase.inauguralStatus.key, // 工作情况
            identityType: this.userbase.identityType,
            isOtherDisease: 0,
            name: this.userbase.name,
            otherDiseaseName: this.userbase.otherDiseaseName,
            placeType: this.userbase.placeType,
            retireEmploymentName:
              this.userbase.inauguralStatus.key === "RETI"
                ? this.userbase.retireEmploymentName
                : null // 单位名称
          };
          if (this.userbase.inauguralStatus.key !== "DOCT") {
            postData.evidenceStuffs.push({
              name: "单位证明",
              matterId: this.userbase.prove3.map(d => d.id).toString()
            });
          }
          break;
        case "2":
          postData = {
            age: this.userbase.age.toString(),
            caseType: this.userbase.caseType,
            contact: this.userbase.phone,
            disease: this.userbase.diagnosis,
            donateNum: this.userbase.count.toString() + ".00",
            donateTime: this.userbase.donateTime + " 00:00:00",
            donateType: this.userbase.donateType,
            employment:
              this.userbase.inauguralStatus.key === "WORK"
                ? this.userbase.employment.id
                : null, // 单位
            employmentArea:
              this.userbase.inauguralStatus.key === "DOCT"
                ? null
                : this.userbase.employmentArea, // 单位所在区
            evidenceBloods: this.userbase.evidenceBloods.map(d => {
              return {
                bloodSubType: d.bloodSubType.toString(),
                unit: d.unit,
                volume: d.volume
              };
            }),
            evidenceStuffs: [
              {
                name: "身份证明",
                matterId: this.userbase.images.map(d => d.id).toString()
              },
              {
                name: "用血通知单",
                matterId: this.userbase.prove2.map(d => d.id).toString()
              },
              {
                type: "4",
                matterId: this.userbase.prove4.map(d => d.id).toString(),
                name: this.userbase.familyName,
                cardType: this.userbase.familyType,
                cardNo: this.userbase.famifamilyNumberlyName
              },
              {
                type: "3",
                matterId: this.userbase.prove1.map(d => d.id).toString()
              },
              {
                type: "2",
                matterId: this.userbase.prove5.map(d => d.id).toString()
              }
            ],
            evidenceType: "WEI",
            gender: this.userbase.gender,
            hospitalName: this.userbase.hospital.name,
            identityId: this.userbase.idNumber,
            inauguralStatus: this.userbase.inauguralStatus.key, // 工作情况
            identityType: this.userbase.identityType,
            isOtherDisease: 0,
            name: this.userbase.name,
            otherDiseaseName: this.userbase.otherDiseaseName,
            // placeType: this.userbase.placeType,
            retireEmploymentName:
              this.userbase.inauguralStatus.key === "RETI"
                ? this.userbase.retireEmploymentName
                : null // 单位名称
          };
          if (this.userbase.inauguralStatus.key !== "DOCT") {
            postData.evidenceStuffs.push({
              name: "单位证明",
              matterId: this.userbase.prove3.map(d => d.id).toString()
            });
          }
          break;
        case "6":
          postData = {
            age: this.userbase.age.toString(),
            caseType: this.userbase.caseType,
            contact: this.userbase.phone,
            disease: this.userbase.diagnosis,
            donateNum: this.userbase.count.toString() + ".00",
            donateTime: this.userbase.donateTime + " 00:00:00",
            donateType: this.userbase.donateType,
            employment:
              this.userbase.inauguralStatus.key === "WORK"
                ? this.userbase.employment.id
                : null, // 单位
            employmentArea:
              this.userbase.inauguralStatus.key === "DOCT"
                ? null
                : this.userbase.employmentArea, // 单位所在区
            evidenceBloods: this.userbase.evidenceBloods.map(d => {
              return {
                bloodSubType: d.bloodSubType.toString(),
                unit: d.unit,
                volume: d.volume
              };
            }),
            evidenceStuffs: [
              {
                name: "身份证明",
                matterId: this.userbase.images.map(d => d.id).toString()
              },
              {
                name: "用血通知单",
                matterId: this.userbase.prove2.map(d => d.id).toString()
              },
              {
                type: "10",
                matterId: this.userbase.prove1.map(d => d.id).toString()
              }
            ],
            evidenceType: "WEI",
            gender: this.userbase.gender,
            hospitalName: this.userbase.hospital.name,
            identityId: this.userbase.idNumber,
            inauguralStatus: "ETC", // 工作情况
            identityType: this.userbase.identityType,
            isOtherDisease: 0,
            name: this.userbase.name,
            otherDiseaseName: this.userbase.otherDiseaseName,
            placeType: this.userbase.placeType,
            retireEmploymentName:
              this.userbase.inauguralStatus.key === "RETI"
                ? this.userbase.retireEmploymentName
                : null // 单位名称
          };
          if (this.userbase.inauguralStatus.key !== "DOCT") {
            postData.evidenceStuffs.push({
              name: "单位证明",
              matterId: this.userbase.prove3.map(d => d.id).toString()
            });
          }
          break;
        case "5":
          postData = {
            age: this.userbase.age.toString(),
            caseType: this.userbase.caseType,
            contact: this.userbase.phone,
            disease: this.userbase.diagnosis,
            // donateNum: this.userbase.count.toString() + ".00",
            // donateTime: this.userbase.donateTime + " 00:00:00",
            // donateType: this.userbase.donateType,
            employment:
              this.userbase.inauguralStatus.key === "WORK"
                ? this.userbase.employment.id
                : null, // 单位
            employmentArea:
              this.userbase.inauguralStatus.key === "DOCT"
                ? null
                : this.userbase.employmentArea, // 单位所在区
            evidenceBloods: this.userbase.evidenceBloods.map(d => {
              return {
                bloodSubType: d.bloodSubType.toString(),
                unit: d.unit,
                volume: d.volume
              };
            }),
            evidenceStuffs: [
              {
                name: "身份证明",
                matterId: this.userbase.images.map(d => d.id).toString()
              },
              {
                name: "用血通知单",
                matterId: this.userbase.prove2.map(d => d.id).toString()
              }
            ],
            evidenceType: "WEI",
            gender: this.userbase.gender,
            hospitalName: this.userbase.hospital.name,
            identityId: this.userbase.idNumber,
            inauguralStatus: this.userbase.inauguralStatus.key, // 工作情况
            identityType: this.userbase.identityType,
            isOtherDisease: 0,
            name: this.userbase.name,
            otherDiseaseName: this.userbase.otherDiseaseName,
            // placeType: this.userbase.placeType,
            retireEmploymentName:
              this.userbase.inauguralStatus.key === "RETI"
                ? this.userbase.retireEmploymentName
                : null // 单位名称
          };
          if (this.userbase.inauguralStatus.key !== "DOCT") {
            postData.evidenceStuffs.push({
              name: "单位证明",
              matterId: this.userbase.prove3.map(d => d.id).toString()
            });
          }
          break;
        default:
      }

      model
        .saveData(postData)
        .then(() => {
          this.updateUserbase({
            age: this.userbase.age,
            agree: this.userbase.agree,
            gender: this.userbase.gender,
            idNumber: this.userbase.idNumber,
            identityType: this.userbase.identityType,
            name: this.userbase.name,
            phone: this.userbase.phone
          });
          if (this.userbase.caseType === "5") {
            this.$router.push(`/succ/5`);
          } else {
            this.$router.push(`/succ`);
          }
        })
        .catch(() => {
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: "提交失败，请检查！"
          });
        });
    },
    hospitalChange(e) {
      model.getHospitals(e).then(data => {
        this.hospitals = data;
      });
    },
    selectHospital(item) {
      this.hospitals = [];
      this.userbase.hospital = { ...item };
    },
    employmentChange(e) {
      model.getEmployments(e).then(data => {
        this.employments = data;
      });
    },
    selectemployment(item) {
      this.employments = [];
      this.userbase.employment = { ...item };
      this.userbase.employmentArea = this.userbase.employment.areaId;
    },
    addBlood() {
      if (
        this.$refs.bloodType.currentValue &&
        this.$refs.bloodCount.currentValue &&
        this.$refs.bloodCount.currentValue > 0
      ) {
        const currentBlood = this.bloodSubTypes.filter(
          d => d.id == this.$refs.bloodType.currentValue
        )[0];
        if (
          this.userbase.evidenceBloods.length > 0 &&
          this.userbase.evidenceBloods.findIndex(
            d => d.bloodSubType == currentBlood.id
          ) !== -1
        ) {
          this.userbase.evidenceBloods[
            this.userbase.evidenceBloods.findIndex(
              d => d.bloodSubType == currentBlood.id
            )
          ]["volume"] =
            parseFloat(this.$refs.bloodCount.currentValue) +
            parseFloat(
              this.userbase.evidenceBloods[
                this.userbase.evidenceBloods.findIndex(
                  d => d.bloodSubType == currentBlood.id
                )
              ]["volume"]
            );
        } else {
          this.userbase.evidenceBloods.push({
            bloodSubType: currentBlood.id,
            unit: currentBlood.unit,
            volume: parseFloat(this.$refs.bloodCount.currentValue).toFixed(2),
            name: currentBlood.name
          });
        }
      }
    },
    deleteBlood(i) {
      this.userbase.evidenceBloods.splice(i, 1);
    },
    go: function(path, caseType) {
      if (caseType) {
        this.$router.push(`${path}/${caseType}`);
      } else {
        this.$router.push(`${path}`);
      }
    },
    inauguralStatusChange: function() {
      console.log(this.userbase.inauguralStatus);
      this.employments = [];
    },
    preview: function() {
      console.log(123);
    }
  },
  created() {
    model.getDisease().then(data => {
      this.disease = data.map(d => {
        if (d.name === "其它") {
          d.value = "其它 (请在下框输入)";
        } else {
          d.value = d.name;
        }
        d.key = d.id;
        return d;
      });
    });
    model.getBloodSubType().then(data => {
      this.bloodSubTypes = data.map(d => {
        d.value = d.name;
        d.key = d.id;
        return d;
      });
    });
    model.getArea().then(data => {
      this.areas = data.filter(d => d.available).map(d => {
        d.value = d.name;
        d.key = d.id;
        return d;
      });
    });
    if (this.userbase.identityType === "01") {
      this.userbase.age = isIdentity.IdCard(this.userbase.idNumber, 3);
      this.userbase.gender = isIdentity.IdCard(this.userbase.idNumber, 2);
    }
    // areas
    this.userbase.caseType = this.$route.params.caseType;
  }
};
</script>

<style scoped>
.layout {
  /* background-image: url(../assets/check_bg.jpg); */
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
}
.default-layout {
  padding: 10px;
  width: 100%;
  position: absolute;
  margin-top: 40px;
  /* top: 20px; */
}
.title {
  font-size: 26px;
  color: #fff;
}
.inauguralStatus-item {
  border: 2px solid #ececec;
  padding: 5px 10px;
  width: 50%;
  border-radius: 5px;
}
.inauguralStatus-item-selected {
  border: 2px solid #1aad19;
  background-color: #1aad19;
  color: #fff;
}
</style>
